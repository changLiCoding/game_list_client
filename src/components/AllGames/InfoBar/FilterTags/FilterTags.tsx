import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';

import { useAppSelector } from '@/app/hooks';

import {
  removeItem,
  resetGameFilter,
  resetHomeFilter,
  resetHomeFilters,
  setHomeFilter,
} from '@/app/store';

import { HomeGameFilters } from '@/features/types';

// type TT<
//   K extends keyof HomeGameFilters,
//   R extends TransformerFunction<HomeGameFilters[K]>
// > = {};

// transfomers.set('genres', (value: Value) => ({
//   included: value.included || [],
//   excluded: value.excluded || [],
// }));

type KeyOf<T> = Extract<keyof T, string>;

// type Formatter<T> = {
//   [Key in keyof T as `format${Capitalize<Key & string>}`]: (
//     value: T[Key]
//   ) => string;
// };
/*

This works
type Formatter<T> = {
  [Key in keyof T]: (value: T[Key]) => T[Key];
};

const val: Formatter<Pick<HomeGameFilters, 'excludedGenres'>> = {
  excludedGenres: (cv) => [],
};
*/

// THIS WORKS
// interface CustomMap<T> extends Map<keyof T, T[keyof T]> {
//   get<Key extends keyof T>(key: Key): T[Key];
//   set<Key extends keyof T>(key: Key, value: T[Key]): this;
//   // you also can override types of other methods
// }

// response.set('excludedGenres', []);
// const t = response.get('excludedGenres');
// if (t) {
//   t.push('');
// }
// Original right above ^^^

// Not the one below
// type TransformerFunction<T> = (value: T) => T;
// type Transformer = (value: string) => string;
// // type Transformer2<T> = (value: T) => T;
// interface CustomMap<T> extends Map<keyof T, Transformer2<T[keyof T]>> {
//   get<Key extends keyof T>(key: Key): Transformer2<T[keyof T]>;
//   set<Key extends keyof T>(key: Key, value: Transformer2<T[keyof T]>): this;
//   // you also can override types of other methods
// }

// const response = new Map() as CustomMap<HomeGameFilters>;
// response.set('excludedGenres', (v) => []);
// response.set('excludedGenres', (v) => 2);
// response.set('excludedGenres', (v) => '');
// const t = response.get('excludedGenres');

// const res = t('');

// function createTransformerMap() {}

// const map = createTransformerMap();
// function foo<
//   T extends KeyOf<HomeGameFilters>,
//   V extends TransformerFunction<T>
// >(): void {
//   const myMap = new Map<T, V>();
//   myMap.set('year' as T, (value) => 2);
// }

// function test<Key extends KeyOf<HomeGameFilters>, V extends Key>() {
//   const map = new Map<Key, V>();

//   map.set('excludedGenres', 2);
// }
// type Transformer2<T> = <K extends keyof T>(value: T[K]) => T[K];

// class CustomMap<T, K extends keyof T> extends Map<K, Transformer2<T>> {
//   set<Key extends K>(key: Key, value: Transformer2<T[Key]>): this {
//     return super.set(key, value) as this;
//   }

//   get<Key extends K>(key: Key): Transformer2<T[Key]> {
//     return super.get(key) as Transformer2<T[Key]>;
//   }
// }

type Formatter<T> = {
  [Key in keyof T]: (value: T[Key]) => string | string[] | undefined;
};
const formatter: Formatter<
  Pick<HomeGameFilters, 'genres' | 'platforms' | 'tags'>
> = {
  genres: (v) =>
    (v.excluded
      ? v.excluded.concat(v.included || [])
      : v.included || []
    ).toString(),
  tags: (v) =>
    (v.excluded
      ? v.excluded.concat(v.included || [])
      : v.included || []
    ).toString(),
  platforms: (v) =>
    (v.excluded
      ? v.excluded.concat(v.included || [])
      : v.included || []
    ).toString(),
};

type Formatter2<T> = {
  [Key in keyof T]: {
    shouldRender: (value: T[Key]) => boolean;
    render: (value: NonNullable<T[Key]>) => string[] | string;
  };
};

// THIS WORKS
// interface CustomMap<T> extends Map<keyof T, T[keyof T]> {
//   get<Key extends keyof T>(key: Key): T[Key];
//   set<Key extends keyof T>(key: Key, value: T[Key]): this;
//   // you also can override types of other methods
// }

// interface CustomMap<T> extends Map<keyof T, T[keyof T]> {
//   get<Key extends keyof T>(key: Key): {
//     shouldRender: (value: T[Key]) => boolean;
//   };
//   set<Key extends keyof T>(
//     key: Key,
//     value: {
//       shouldRender: (value: T[Key]) => boolean;
//     }
//   ): this;
//   // you also can override types of other methods
// }
interface CustomMap<T> extends Map<keyof T, T[keyof T]> {
  get<Key extends keyof T>(
    key: Key
  ):
    | {
        shouldRender: (value: T[Key]) => boolean;
        render: (value: NonNullable<T[Key]>) => string;
      }
    | undefined;
  set<Key extends keyof T>(
    key: Key,
    value: {
      shouldRender: (value: T[Key]) => boolean;
      render: (value: NonNullable<T[Key]>) => string;
    }
  ): this;
}

// Co pilot
// interface CustomMap<T> extends Map<keyof T, T[keyof T] | { shouldRender: (value: T[keyof T]) => boolean }> {
//   get<Key extends keyof T>(key: Key): T[Key] | { shouldRender: (value: T[Key]) => boolean } | undefined;
//   set<Key extends keyof T>(key: Key, value: T[Key] | { shouldRender: (value: T[Key]) => boolean }): this;
// }

const response = new Map() as CustomMap<HomeGameFilters>;
// response.set('genres', {
//   shouldRender(value) {
//     return value.excluded.length + value.included.length > 0;
//   },
//   render(value) {
//     return '';
//   },
// });

response.set('year', {
  shouldRender(value) {
    return value !== undefined;
  },
  render(value) {
    return 'year here';
  },
});

type IncludeExcludeFiltersType = {
  included: string[];
  excluded: string[];
};

function renderTag(tag: string, value: string) {
  return (
    <Tag
      id={`${tag}-${value}`}
      closable
      onClose={() => {
        // const removedFilter = remove(value, filterValue);
        // dispatch(setGameFilters({ [key]: removedFilter }));
        // dispatch(
        //   removeItem({
        //     category: 'genres',
        //     entry: value,
        //   })
        // );
      }}
      key={`-${value}`}
      className={styles.tagsText}
    >
      {value}
    </Tag>
  );
}

// JSX.Element
function renderIncludeExclude() {
  return {
    shouldRender(value: IncludeExcludeFiltersType) {
      return value.excluded.length + value.included.length > 0;
    },
    render(value: IncludeExcludeFiltersType) {
      const includedMap = value.included.map((e) => {
        return e;
      });
      return '';
    },
  };
}

// function renderSingle

type Formatter3<T> = {
  [Key in keyof T]: {
    shouldRender: (value: T[Key]) => boolean;
    render: (value: NonNullable<T[Key]>) => string;
  };
};

const hehe: Formatter3<HomeGameFilters> = {
  genres: renderIncludeExclude(),
  platforms: renderIncludeExclude(),
  tags: renderIncludeExclude(),
  search: {
    shouldRender(value) {
      return value !== undefined && value.length > 0;
    },
    render(value) {
      return value;
    },
  },
  year: {
    shouldRender(value) {
      return value !== undefined;
    },
    render(value) {
      return value.toString();
    },
  },
  sortBy: {
    shouldRender(value) {
      return false;
    },
    render(_value) {
      return _value;
    },
  },
};

export type EntryOf<O> = {
  [K in keyof O]-?: [K, Exclude<O[K], undefined>];
}[O extends readonly unknown[] ? keyof O & number : keyof O] &
  unknown;

export type EntriesOf<O extends object> = EntryOf<O>[] & unknown;

export const entriesOf = <O extends object>(o: O) =>
  Object.entries(o) as EntriesOf<O>;

// Inferred as (["a", "foo"] | ["b", "bar"])[]
const example = entriesOf({ a: 'foo', b: 'bar', c: 12 } as const);
// Object.entries(bigTest).reduce((accumulator, currentValue) => {
//   const key = currentValue[0] as keyof typeof example;
//   const tt = currentValue[key];
//   accumulator.push(currentValue);
//   console.log('accumulator', accumulator);
//   console.log('currentValue', currentValue);
//   console.log('key', key);
//   return accumulator;
// }, []);

function create<T>() {
  const map = new Map<keyof T, T[keyof T]>();
  return map;
}

create<HomeGameFilters>().set('year', '');

type ValueOf<T> = T[keyof T];
export type ValueOf2<T> = T[keyof T];
type Formatter4<T> = {
  value: keyof T;
  shouldRender: (value: keyof Formatter4<T>['value']) => boolean;
  // render: (value: typeof value) => string;
};

const v2: Formatter4<HomeGameFilters> = {
  value: 'year',
  shouldRender(value) {
    return true;
  },
};

function FilterTags() {
  const dispatch = useDispatch();
  // const gameFilters = useAppSelector((state) => state.gameFilters);
  const homeGameFilters = useAppSelector((state) => state.homeGameFilters);

  const arrTest3 = useMemo(() => {
    console.log('arrTest3 memo is running');
    const arrTest = [
      {
        value: homeGameFilters.year,
        shouldRender() {
          return homeGameFilters.year !== undefined;
        },
        render() {
          return (
            <Tag
              id="filter-year"
              closable
              onClose={() => {
                // const removedFilter = remove(value, filterValue);
                dispatch(resetHomeFilter('year'));
                // dispatch(
                //   removeItem({
                //     category: 'genres',
                //     entry: value,
                //   })
                // );
              }}
              key="filter-year"
              className={styles.tagsText}
            >
              {homeGameFilters.year}
            </Tag>
          );
        },
      },
      // {
      //   value: homeGameFilters.search,
      //   shouldRender(value) {
      //     return (
      //       homeGameFilters.search !== undefined &&
      //       homeGameFilters.search.length > 0
      //     );
      //   },
      //   render(value) {
      //     return '';
      //   },
      // },
    ];

    const filter = arrTest.filter((e) => e.shouldRender());
    if (filter.length > 0)
      return (
        <>
          <TagsTwoTone className={styles.tagsIcon} />

          {filter.map((e) => e.render())}
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
  }, [homeGameFilters, dispatch]);

  const reduce2 = useMemo(() => {
    Object.entries(homeGameFilters).reduce((accumulator, currentValue) => {
      const [key, value] = currentValue;
      const h = key as keyof HomeGameFilters;
      const hv = hehe[h];
      if (hv && hv.shouldRender(value)) {
        console.log('');
      }
      return accumulator;
    }, []);
    if (
      homeGameFilters.genres.included.length > 0 ||
      homeGameFilters.genres.excluded.length > 0
    )
      return (
        <>
          <TagsTwoTone className={styles.tagsIcon} />

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
  }, [homeGameFilters, dispatch]);

  const reduce = useMemo(() => {
    // const entries = Object.entries(homeGameFilters).filter((e) => {
    //   const [key, value] = e;
    //   const h = e[0] as keyof HomeGameFilters;
    //   const res = response.get(h);
    //   if (res && res.shouldRender(value))
    //     return value !== undefined && res.shouldRender(value);
    //   return false;
    // });

    const en = Object.entries(homeGameFilters).reduce(
      (accumulator, currentValue) => {
        const [key, value] = currentValue;
        const h = key as keyof HomeGameFilters;
        const res = response.get(h);
        if (value && res && res.shouldRender(value)) {
          accumulator.push(res.render(value));
        }
        return accumulator;
      },
      [] as string[]
    );

    if (
      homeGameFilters.genres.included.length > 0 ||
      homeGameFilters.genres.excluded.length > 0
    )
      return (
        <>
          <TagsTwoTone className={styles.tagsIcon} />

          {en}
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
  }, [homeGameFilters, dispatch]);

  const filterTags22 = useMemo(() => {
    if (
      homeGameFilters.genres.included.length > 0 ||
      homeGameFilters.genres.excluded.length > 0
    )
      return (
        <>
          <TagsTwoTone className={styles.tagsIcon} />

          {homeGameFilters.genres.included.map((e) => {
            return (
              <Tag
                key={e}
                closable
                onClose={() =>
                  dispatch(
                    removeItem({
                      category: 'genres',
                      entry: e,
                    })
                  )
                }
                className={styles.clearAll}
              >
                {e}
              </Tag>
            );
          })}

          {homeGameFilters.genres.excluded.map((e) => {
            return (
              <Tag
                key={e}
                closable
                onClose={() =>
                  dispatch(
                    removeItem({
                      category: 'genres',
                      entry: e,
                    })
                  )
                }
                className={styles.clearAll}
              >
                Clear All
              </Tag>
            );
          })}

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
  }, [homeGameFilters, dispatch]);

  const filterTags = useMemo(() => {
    // Loop through all the keys and values of gameFilters and filter out the non null and undefined values
    const entries = Object.entries(homeGameFilters).filter((e) => {
      const [key, value] = e;
      const h = e[0] as keyof HomeGameFilters;
      const res = response.get(h);
      if (res && res.shouldRender(value))
        return value !== undefined && res.shouldRender(value);
      return false;
    });

    if (
      homeGameFilters.genres.included.length > 0 ||
      homeGameFilters.genres.excluded.length > 0
    )
      return (
        <>
          <TagsTwoTone className={styles.tagsIcon} />

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
  }, [homeGameFilters, dispatch]);

  // const filterTags = useMemo(() => {
  //   // Loop through all the keys and values of gameFilters and filter out the non null and undefined values
  //   const entries = Object.entries(gameFilters).filter((e) => {
  //     if (e && (e[0] === 'sortBy' || e[0] === 'state')) return false; // Don't show sortBy in the filter tags - Kind of a hack, but were only filtering out 1 key
  //     if (Array.isArray(e[1])) return e[1].length > 0;
  //     return e[1];
  //   });

  //   if (entries.length > 0)
  //     return (
  //       <>
  //         <TagsTwoTone className={styles.tagsIcon} />

  //         {entries.map(([key, value]) => {
  //           if (Array.isArray(value)) {
  //             return value.map((filterValue) => {
  //               return (
  //                 <Tag
  //                   id={`tag-${key}`}
  //                   closable
  //                   onClose={() => {
  //                     const removedFilter = remove(value, filterValue);
  //                     dispatch(setGameFilters({ [key]: removedFilter }));
  //                   }}
  //                   key={`${key}-${filterValue}`}
  //                   className={styles.tagsText}
  //                 >
  //                   {/* Again were only checking for excludedGenres this time. Note: if we had to do this for a 3rd variable,
  //       this would probably move to a transformer type function to handle these scenarios */}
  //                   {key === 'excludedGenres' && <>-</>}
  //                   {filterValue}
  //                 </Tag>
  //               );
  //             });
  //           }
  //           return (
  //             <Tag
  //               id={`tag-${key}`}
  //               closable
  //               onClose={() => {
  //                 dispatch(resetGameFilter(key as keyof HomeGameFilters));
  //               }}
  //               key={value}
  //               className={styles.tagsText}
  //             >
  //               {value}
  //             </Tag>
  //           );
  //         })}

  //         <Tag
  //           closable
  //           onClose={() => dispatch(clearAll())}
  //           className={styles.clearAll}
  //         >
  //           Clear all
  //         </Tag>

  //         <Tag
  //           closable
  //           onClose={() => dispatch(clearCategory('genres'))}
  //           color="blue"
  //         >
  //           Clear Genres
  //         </Tag>
  //         {/* <Tag
  //           closable
  //           onClose={() => dispatch(resetGameFilters())}
  //           className={styles.clearAll}
  //         >
  //           Clear all
  //         </Tag> */}
  //       </>
  //     );

  //   return <div />;
  // }, [dispatch, gameFilters]);

  return <div className={styles.tagsContainer}>{filterTags22}</div>;
}

export default FilterTags;
