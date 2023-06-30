import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';

import { useAppSelector } from '@/app/hooks';
import { remove } from '@/utils/utils';
import { clearCategory, resetGameFilter, setGameFilters } from '@/app/store';

import { HomeGameFilters as BigTestFilters } from '@/features/types';
import { HomeGameFilters } from '@/types/global';

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
interface CustomMap<T> extends Map<keyof T, T[keyof T]> {
  get<Key extends keyof T>(key: Key): T[Key];
  set<Key extends keyof T>(key: Key, value: T[Key]): this;
  // you also can override types of other methods
}
const response = new Map() as CustomMap<HomeGameFilters>;

response.set('excludedGenres', []);
const t = response.get('excludedGenres');
if (t) {
  t.push('');
}
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
  Pick<BigTestFilters, 'genres' | 'platforms' | 'tags'>
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

function FilterTags() {
  const dispatch = useDispatch();
  // const gameFilters = useAppSelector((state) => state.gameFilters);
  const homeGameFilters = useAppSelector((state) => state.homeGameFilters);

  // const filterTags2 = useMemo(() => {
  //   const testObj = {
  //     sortBy: 'name',
  //     genres: {
  //       included: ['includegen1', 'includedgen2'],
  //       excluded: [],
  //     },
  //     tags: {
  //       included: ['includetag1', ''],
  //       excluded: ['excludedgen2'],
  //     },
  //   };
  //   const example1 = entriesOf(testObj)
  //     .filter((e) => {
  //       return e[1] && e[0] !== 'sortBy';
  //     })
  //     .reduce((accumulator, currentValue) => {
  //       accumulator.push('e');
  //       return accumulator;
  //     }, [] as string[]);

  //   // const sumWithInitial = array1.reduce(
  //   //   (accumulator, currentValue) => accumulator + currentValue,
  //   //   initialValue
  //   // );

  //   console.log('filter tags example:', example1);
  // }, []);
  const filterTags = useMemo(() => {
    // Loop through all the keys and values of gameFilters and filter out the non null and undefined values
    const entries = Object.entries(homeGameFilters).filter((e) => {
      if (e && e[0] === 'sortBy') return false; // Don't show sortBy in the filter tags - Kind of a hack, but were only filtering out 1 key
      if (Array.isArray(e[1])) return e[1].length > 0;
      return e[1];
    });

    if (
      homeGameFilters.genres.included.length > 0 ||
      homeGameFilters.genres.excluded.length > 0
    )
      return (
        <>
          <TagsTwoTone className={styles.tagsIcon} />

          {homeGameFilters.genres.included.map((value) => {
            return (
              <Tag
                id={`tag-${value}`}
                closable
                onClose={() => {
                  // const removedFilter = remove(value, filterValue);
                  // dispatch(setGameFilters({ [key]: removedFilter }));
                }}
                key={`-${value}`}
                className={styles.tagsText}
              >
                {value}
              </Tag>
            );
          })}

          {homeGameFilters.genres.excluded.map((value) => {
            return (
              <Tag
                id={`tag-${value}`}
                closable
                onClose={() => {
                  // const removedFilter = remove(value, filterValue);
                  // dispatch(setGameFilters({ [key]: removedFilter }));
                }}
                key={`-${value}`}
                className={styles.tagsText}
              >
                -{value}
              </Tag>
            );
          })}

          <Tag
            closable
            onClose={() => dispatch(clearCategory('genres'))}
            color="blue"
          >
            Clear Genres
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

  return <div className={styles.tagsContainer}>{filterTags}</div>;
}

export default FilterTags;
