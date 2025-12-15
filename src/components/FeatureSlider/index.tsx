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
  $?: {
    title?: Record<string, unknown>;
    body?: Record<string, unknown>;
    file?: Record<string, unknown>;
    [key: string]: unknown;
  };
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
  $?: Record<string, unknown>;
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
  originalTab?: Tab;
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
          originalTab: tab,
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
  const activeTab = currentCategory?.originalTab;
  const activeGroup = activeTab?.group;

  console.log('transformedCategories', transformedCategories);

  return (
    <div
      className=" max-w-8xl mx-8 mt-16 px-8 mb-2 h-5/6 items-center justify-center"
      {...((tabs?.$ as Record<string, unknown>) || {})}
    >
      <div className="flex justify-center  max-w-8xl mx-8 mt-16 px-8 mb-2 h-5/6 items-center justify-center">
        <div className="flex w-full max-w-8xl mx-auto mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6 md:px-8 mb-2 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] items-center justify-center">
          <div
            className={`flex w-full 2xl:w-[92rem] xl:w-[80rem] lg:w-[72rem] md:w-[56rem] flex-col md:flex-row items-center justify-center ${currentCategory?.imageSide === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            style={{ backgroundColor: 'rgb(240, 249, 255)' }}
          >
            <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-center w-full md:w-1/2 text-neutral-700 order-2 md:order-0 min-h-[200px] sm:min-h-[250px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]">
              <div className="w-full">
                {displayContent?.title && (
                  <h3
                    {...(activeGroup?.$?.title || {})}
                    className="py-3 sm:py-4 px-4 sm:px-6 text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-['Cinzel']"
                  >
                    {displayContent.title}
                  </h3>
                )}
              </div>
              {displayContent?.description && (
                <div
                  {...(activeGroup?.$?.body || {})}
                  className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl px-4 sm:px-6 md:pr-6 lg:pr-10 xl:pr-20 tracking-[.05rem] leading-6 sm:leading-7 font-extralight w-full"
                >
                  {displayContent.description}
                </div>
              )}
            </div>
            {displayContent?.image && (
              <div className="flex w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] order-1 md:order-0">
                <img
                  {...(activeGroup?.$?.file || {})}
                  className="object-cover w-full h-full"
                  src={displayContent.image}
                  alt={displayContent.title || ''}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {transformedCategories.length > 0 && (
        <div className="flex justify-center mx-[200px]">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 m-4 sm:m-6 md:m-8 md:grid md:grid-cols-4 md:max-w-8xl w-full px-4 sm:px-6 md:px-0">
            {transformedCategories.map((category, index) => {
              console.log('category', category);
              const isActive = activeCategory === category.value;
              return (
                <button
                  {...(category?.originalTab?.group?.$?.title || {})}
                  key={category.value || index}
                  type="button"
                  className={
                    isActive
                      ? "border-b-4 border-black text-base sm:text-lg md:text-xl lg:text-2xl font-['Cinzel'] px-4 sm:px-3 md:px-4 whitespace-nowrap  transition-all  w-full items-center justify-center"
                      : "border-b-4 border-transparent transition-all hover:border-b-4 hover:border-black text-base sm:text-lg md:text-xl lg:text-2xl font-['Cinzel'] px-4 sm:px-3 md:px-4 whitespace-nowrap w-full items-center justify-center"
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
