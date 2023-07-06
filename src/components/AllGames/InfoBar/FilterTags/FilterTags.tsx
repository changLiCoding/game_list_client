import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';

import { useAppSelector } from '@/app/hooks';

import { removeItem, resetHomeFilter, resetHomeFilters } from '@/app/store';

type FilterType = {
  shouldRender: () => boolean;
  render: () => JSX.Element;
};

// type IncludeExcludeFiltersType = {
//   included: string[];
//   excluded: string[];
// };

function FilterTags() {
  const dispatch = useDispatch();
  // const gameFilters = useAppSelector((state) => state.gameFilters);
  const homeGameFilters = useAppSelector((state) => state.homeGameFilters);

  function renderTag(tag: string, value: any, onClose: () => void) {
    return (
      <Tag
        id={tag}
        closable
        onClose={onClose}
        key={tag}
        className={styles.tagsText}
      >
        {value}
      </Tag>
    );
  }

  // // JSX.Element
  // function renderIncludeExclude(
  //   tag: string,
  //   // value: IncludeExcludeFiltersType,
  //   keyValue: CorrectFiltersKeys,
  //   dispatch
  // ): FilterType {
  //   const onClose = (e) => {
  //     dispatch(
  //       removeItem({
  //         category: keyValue,
  //         entry: e,
  //       })
  //     );
  //   };

  //   const value = homeGameFilters[keyValue];

  //   return {
  //     shouldRender() {
  //       return value.excluded.length + value.included.length > 0;
  //     },
  //     render() {
  //       return (
  //         <>
  //           {value.included.length > 0 &&
  //             value.included.map((e) =>
  //               renderTag(`included-${e}`, e, () => onClose(e))
  //             )}
  //           {value.excluded.length > 0 &&
  //             value.excluded.map((e) =>
  //               renderTag(`excluded-${e}`, e, () => onClose(e))
  //             )}
  //         </>
  //       );
  //     },
  //   };
  // }

  const neverChange = useMemo(() => {
    const arrTest: FilterType[] = [
      // Search
      {
        shouldRender() {
          return (
            homeGameFilters.search !== undefined &&
            homeGameFilters.search.length > 0
          );
        },
        render() {
          return renderTag('filter-search', homeGameFilters.search, () => {
            dispatch(resetHomeFilter('search'));
          });
        },
      },
      // Genres
      // renderIncludeExclude('filter-genres', 'genres', dispatch),
      {
        shouldRender() {
          return (
            homeGameFilters.genres.included.length +
              homeGameFilters.genres.excluded.length >
            0
          );
        },
        render() {
          return (
            <>
              {homeGameFilters.genres.included.length > 0 &&
                homeGameFilters.genres.included.map((e) =>
                  renderTag(`included-${e}`, e, () => {
                    dispatch(
                      removeItem({
                        category: 'genres',
                        entry: e,
                      })
                    );
                  })
                )}
              {homeGameFilters.genres.excluded.length > 0 &&
                homeGameFilters.genres.excluded.map((e) =>
                  renderTag(`excluded-${e}`, `-${e}`, () => {
                    dispatch(
                      removeItem({
                        category: 'genres',
                        entry: e,
                      })
                    );
                  })
                )}
            </>
          );
        },
      },

      // Platforms
      {
        shouldRender() {
          return (
            homeGameFilters.platforms.included.length +
              homeGameFilters.platforms.excluded.length >
            0
          );
        },
        render() {
          return (
            <>
              {homeGameFilters.platforms.included.length > 0 &&
                homeGameFilters.platforms.included.map((e) =>
                  renderTag(`included-${e}`, e, () => {
                    dispatch(
                      removeItem({
                        category: 'platforms',
                        entry: e,
                      })
                    );
                  })
                )}
              {homeGameFilters.platforms.excluded.length > 0 &&
                homeGameFilters.platforms.excluded.map((e) =>
                  renderTag(`excluded-${e}`, `-${e}`, () => {
                    dispatch(
                      removeItem({
                        category: 'platforms',
                        entry: e,
                      })
                    );
                  })
                )}
            </>
          );
        },
      },

      {
        shouldRender() {
          return (
            homeGameFilters.tags.included.length +
              homeGameFilters.tags.excluded.length >
            0
          );
        },
        render() {
          return (
            <>
              {homeGameFilters.tags.included.length > 0 &&
                homeGameFilters.tags.included.map((e) =>
                  renderTag(`included-${e}`, e, () => {
                    dispatch(
                      removeItem({
                        category: 'tags',
                        entry: e,
                      })
                    );
                  })
                )}
              {homeGameFilters.tags.excluded.length > 0 &&
                homeGameFilters.tags.excluded.map((e) =>
                  renderTag(`excluded-${e}`, `-${e}`, () => {
                    dispatch(
                      removeItem({
                        category: 'tags',
                        entry: e,
                      })
                    );
                  })
                )}
            </>
          );
        },
      },

      // Year
      {
        shouldRender() {
          return homeGameFilters.year !== undefined;
        },
        render() {
          return renderTag('filter-year', homeGameFilters.year, () => {
            dispatch(resetHomeFilter('year'));
          });
        },
      },
    ];

    return arrTest;
  }, [
    dispatch,
    homeGameFilters.genres,
    homeGameFilters.platforms,
    homeGameFilters.tags,
    homeGameFilters.search,
    homeGameFilters.year,
  ]);

  // V2
  const reduce = useMemo(() => {
    const elements = neverChange
      .filter((e) => e.shouldRender())
      .map((e) => e.render());

    if (elements.length > 0)
      return (
        <>
          <TagsTwoTone className={styles.tagsIcon} />

          {elements}

          <Tag
            closable
            onClose={() => dispatch(resetHomeFilters())}
            className={styles.clearAll}
          >
            Clear All
          </Tag>
        </>
      );
    return <div />;
  }, [dispatch, neverChange]);

  return <div className={styles.tagsContainer}>{reduce}</div>;
}

export default FilterTags;

// interface CustomMap<T> extends Map<keyof T, T[keyof T]> {
//   get<Key extends keyof T>(
//     key: Key
//   ):
//     | {
//         shouldRender: (value: T[Key]) => boolean;
//         render: (value: NonNullable<T[Key]>) => JSX.Element;
//       }
//     | undefined;
//   set<Key extends keyof T>(
//     key: Key,
//     value: {
//       shouldRender: (value: T[Key]) => boolean;
//       render: (value: NonNullable<T[Key]>) => JSX.Element;
//     }
//   ): this;
// }
// const response = new Map() as CustomMap<HomeGameFilters>;
// response.set('year', {
//   shouldRender(value) {
//     return value !== undefined;
//   },
//   render(value) {
//     return renderTag('filter-year', value);
//   },
// });

// response.set('search', {
//   shouldRender(value) {
//     return value !== undefined && value.length > 0;
//   },
//   render(value) {
//     return renderTag('tag-search', value);
//   },
// });

// return (
//   <Tag
//     id="filter-year"
//     closable
//     onClose={() => {
//       dispatch(resetHomeFilter('year'));
//     }}
//     key="filter-year"
//     className={styles.tagsText}
//   >
//     {homeGameFilters.year}
//   </Tag>
// );
// V1
// const reduce = useMemo(() => {
//   const en = Object.entries(homeGameFilters).reduce(
//     (accumulator, currentValue) => {
//       const [key, value] = currentValue;
//       const h = key as keyof HomeGameFilters;
//       const res = response.get(h);
//       if (value && res && res.shouldRender(value)) {
//         accumulator.push(res.render(value));
//         // console.log('');
//       }
//       return accumulator;
//     },
//     [] as JSX.Element[]
//   );
//   // console.log('REDUCE = ', en);

//   if (en.length > 0)
//     return (
//       <>
//         <TagsTwoTone className={styles.tagsIcon} />

//         {en}

//         <Tag
//           closable
//           onClose={() => dispatch(resetHomeFilters())}
//           className={styles.clearAll}
//         >
//           Clear All
//         </Tag>
//       </>
//     );
//   return <div />;
// }, [dispatch, homeGameFilters]);
