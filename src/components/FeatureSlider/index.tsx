'use client';

import { useState, useMemo } from 'react';

interface ContentstackFile {
  url?: string;
  uid?: string;
  filename?: string;
  [key: string]: unknown;
}

interface TabGroup {
  title?: string;
  tab_text?: string;
  body?: string;
  file?: ContentstackFile;
  [key: string]: unknown;
}

interface Tab {
  group?: TabGroup;
  _metadata?: {
    uid?: string;
  };
  [key: string]: unknown;
}

interface TabsData {
  tabs?: Tab[];
  _metadata?: {
    uid?: string;
  };
  [key: string]: unknown;
}

interface FeatureSliderProps {
  tabs?: TabsData;
  categories?: Array<{
    title: string;
    value: string;
    groups?: Array<{
      image?: string;
      title?: string;
      description?: string;
    }>;
  }>;
}

interface DisplayContent {
  image?: string;
  title?: string;
  description?: string;
}

interface CategoryItem {
  title: string;
  value: string;
  imageSide?: string;
  content: DisplayContent | null;
}

export const FeatureSlider = (props: FeatureSliderProps) => {
  const { tabs } = props;

  console.log('tabs', tabs);

  const transformedCategories = useMemo<CategoryItem[]>(() => {
    if (tabs?.tabs && Array.isArray(tabs.tabs)) {
      return tabs.tabs.map((tab) => {
        const group = tab.group || {};
        const title = group.tab_text || group.title || '';
        const value = title.toLowerCase().replace(/\s+/g, '-');
        const imageUrl = group.file?.url || '';
        const description = group.body || '';
        const imageSide = (
          typeof group.image_side === 'string' ? group.image_side : 'left'
        ) as string;

        return {
          title: title,
          value: value,
          imageSide: imageSide,
          content: {
            image: imageUrl,
            title: group.title || title,
            description: description,
          },
        };
      });
    }

    return [];
  }, [tabs]);

  const initialState = useMemo(() => {
    if (transformedCategories.length > 0) {
      const firstCategory = transformedCategories[0];
      return {
        category: firstCategory.value,
        content: firstCategory.content,
      };
    }
    return { category: '', content: null };
  }, [transformedCategories]);

  const [activeCategory, setActiveCategory] = useState<string>(
    initialState.category,
  );
  const [activeContent, setActiveContent] = useState<DisplayContent | null>(
    initialState.content,
  );

  const handleCategoryClick = (category: CategoryItem) => {
    setActiveCategory(category.value);
    setActiveContent(category.content);
  };

  const currentCategory = transformedCategories.find(
    (cat) => cat.value === activeCategory,
  );

  const displayContent = activeContent || currentCategory?.content || null;

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex max-w-8xl mx-8 mt-16 px-8 mb-2 h-5/6 items-center justify-center">
          <div
            className={`flex 2xl:w-[92rem] lg:w-[72rem] md:w-[56rem] max-md:flex-wrap items-center justify-center h-full ${currentCategory?.imageSide === 'right' ? 'flex-row-reverse' : 'flex-row'}`}
            style={{ backgroundColor: 'rgb(240, 249, 255)' }}
          >
            <div className="p-6 md:text-m h-[400px] xl:h-[600px] lg:h-[500px] flex flex-col flex-wrap content-center justify-center w-full text-neutral-700 order-2">
              <div className="w-full">
                {displayContent?.title && (
                  <h3 className="py-4 px-6 text-[32px] font-['Cinzel']">
                    {displayContent.title}
                  </h3>
                )}
              </div>
              {displayContent?.description && (
                <div className="lg:text-lg xl:text-xl px-6 lg:pr-10 xl:pr-20 tracking-[.05rem] leading-7 font-extralight w-full">
                  {displayContent.description}
                </div>
              )}
            </div>
            {displayContent?.image && (
              <div className="flex h-full w-full">
                <img
                  className="h-[400px] object-cover w-full max-md:h-full xl:h-[600px] lg:h-[500px] order-1"
                  src={displayContent.image}
                  alt={displayContent.title || ''}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {transformedCategories.length > 0 && (
        <div className="flex justify-center">
          <div className="flex m-8 md:grid md:grid-cols-4 max-md:gap-8 md:gap-16 auto-rows-fr justify-items-center md:max-w-8xl sm:max-w-4xl">
            {transformedCategories.map((category, index) => {
              const isActive = activeCategory === category.value;
              return (
                <button
                  key={category.value || index}
                  type="button"
                  className={
                    isActive
                      ? "border-b-4 border-black text-2xl font-['Cinzel'] max-md:max-w-[25%]"
                      : "border-b-4 border-transparent transition-all hover:border-b-4 hover:border-black text-2xl font-['Cinzel'] max-md:max-w-[25%]"
                  }
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
