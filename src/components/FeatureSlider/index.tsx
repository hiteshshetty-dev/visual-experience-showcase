'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
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

  return (
    <div
      className="max-w-8xl mx-auto mt-6 sm:mt-8 md:mt-12 lg:mt-16 px-3 sm:px-4 md:px-6 lg:px-8 mb-2 h-auto md:h-5/6 items-center justify-center"
      {...((tabs?.$ as Record<string, unknown>) || {})}
    >
      <div className="flex justify-center items-center">
        <div className="flex w-full max-w-8xl mx-auto px-0 mb-2 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] items-center justify-center">
          <div
            className={`flex w-full 2xl:w-[92rem] xl:w-[80rem] lg:w-[72rem] md:w-[56rem] flex-col md:flex-row items-stretch justify-center ${
              currentCategory?.imageSide === "right"
                ? "md:flex-row-reverse"
                : "md:flex-row"
            }`}
            style={{ backgroundColor: "rgb(240, 249, 255)" }}
          >
            <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-center w-full md:w-1/2 text-neutral-700 order-2 md:order-0 min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]">
              <div className="w-full">
                {displayContent?.title && (
                  <h3
                    {...(activeGroup?.$?.title || {})}
                    className="py-2 sm:py-3 md:py-4 px-2 sm:px-4 md:px-6 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px] font-['Cinzel']"
                  >
                    {displayContent.title}
                  </h3>
                )}
              </div>
              {displayContent?.description && (
                <div
                  {...(activeGroup?.$?.body || {})}
                  className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl px-2 sm:px-4 md:px-6 md:pr-6 lg:pr-10 xl:pr-20 tracking-[.05rem] leading-5 sm:leading-6 md:leading-7 font-extralight w-full"
                >
                  {displayContent.description}
                </div>
              )}
            </div>
            {displayContent?.image && (
              <div className="flex w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] order-1 md:order-0">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
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
        <div className="flex justify-center mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-[200px]">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-8 xl:gap-12 2xl:gap-16 m-2 sm:m-4 md:m-6 lg:m-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 max-w-8xl w-full px-2 sm:px-4 md:px-6 lg:px-0">
            {transformedCategories.map((category, index) => {
              const isActive = activeCategory === category.value;
              return (
                <button
                  {...(category?.originalTab?.group?.$?.title || {})}
                  key={category.value || index}
                  type="button"
                  className={
                    isActive
                      ? "border-b-2 sm:border-b-3 md:border-b-4 border-black text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-display px-2 sm:px-3 md:px-4 py-2 whitespace-nowrap transition-all w-full flex items-center justify-center"
                      : "border-b-2 sm:border-b-3 md:border-b-4 border-transparent transition-all hover:border-black text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-display px-2 sm:px-3 md:px-4 py-2 whitespace-nowrap w-full flex items-center justify-center"
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
