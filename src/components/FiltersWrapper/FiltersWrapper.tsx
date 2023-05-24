import { Layout, Grid, Input, Space, Button, Select } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { d } from 'vitest/dist/types-e3c9754d';
import styles from '@/components/FiltersWrapper/FiltersWrapper.module.scss';
import filterFieldStyles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import useGetFilters from '@/services/game/useGetFilters';

import { useAppSelector } from '@/app/hooks';
import { setFilter1, setFilters } from '@/features/gameFiltersSlice';

const { Search } = Input;

export default function FiltersWrapper() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const gameFilters = useAppSelector((state) => state.gameFilters);
  const filters = useGetFilters();

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  console.log('gameFilters', gameFilters);
  return (
    <Layout className={styles.layoutFiltersWrapperContainer}>
      {screens.md ? (
        <div className={filterFieldStyles.layoutFilterFieldContainer}>
          <h3 className={filterFieldStyles.h3FilterFieldTitle}>Genres Test</h3>
          <Select
            mode="multiple"
            maxTagCount="responsive"
            style={{ width: 200 }}
            className={styles.cascaderStyle}
            // value={gameFilters.genres.map((e) => {
            //   return {
            //     value: e,
            //     label: e,
            //   };
            // })}
            allowClear
            onChange={(v: string[], o) => {
              console.log('onChange', v, o);
              dispatch(setFilters({ genres: v }));
            }}
          >
            {filters.genres.map((s) => (
              <Select.Option key={s} value={s}>
                <div className={styles.option}>{s}</div>
              </Select.Option>
            ))}
          </Select>
        </div>
      ) : (
        /* 
              <div>{e.name}</div>
              <FilterField2
                key={e.name}
                style={{ width: 150 }}
                customCascaderStyle={styles.cascaderStyle}
                allowClear
                onClear={(old) => {
                  console.log('onClear', old);
                  e.selected = [];
                  dispatch(
                    removeFilter({
                      type: e.name,
                    })
                  );
                }}
                onSelect={(old, v) => {
                  console.log('onSelect', old, v);
                  e.selected.push(v);
                  dispatch(
                    addFilter({
                      type: e.name,
                      value: [v],
                    })
                  );
                }}
              >
                {e.values.map((s) => (
                  <Select.Option key={s.label} value={s.value}>
                    <div className={styles.option}>
                      {s.label}{' '}
                      {e.selected.includes(s.label) && <CheckCircleOutlined />}
                    </div>
                  </Select.Option>
                ))}
              </FilterField2> 
         <Select
                key={e.name}
                style={{ width: 120 }}
                allowClear
                value={e.selected}
                onClear={() => {
                  e.selected = '';
                  console.log('onClear');
                }}
                onSelect={(v, o) => {
                  e.selected = v;
                  console.log('onSelect', v, o);
                }}
              >
                {e.values.map((s) => (
                  <Select.Option key={s.label} value={s.value}>
                    <div className={styles.option}>{s.label}</div>
                  </Select.Option>
                ))}
              </Select> */

        // <Select
        //   style={{ width: 120 }}
        //   allowClear
        //   // value={last}
        //   onClear={() => {
        //     console.log('onClear');
        //   }}
        //   onSelect={(v, o) => {
        //     console.log('onSelect', v, o);
        //   }}
        // >
        //   {/* {values.map((s) => (
        //     <Select.Option key={s} value={s}>
        //       <div className={styles.option}>
        //         {s} {selected.includes(s) && <CheckCircleOutlined />}
        //       </div>
        //     </Select.Option>
        //   ))} */}
        // </Select>
        //   setLast(v);
        //   if (v) {
        // dispatch(
        //   addFilter({
        //     type: 'Platform',
        //     value: [v],
        //   })
        // );
        //   } else {
        // dispatch(
        //   removeFilter({
        //     type: 'Platform',
        //   })
        // );
        //   }
        // }}
        <Space
          direction="horizontal"
          size={screens.sm ? 48 : 24}
          className={styles.spaceFiltersWrapperContainer}
        >
          <Search
            className={styles.searchFiltersWrapperSearch}
            placeholder="input search text"
            size="large"
            onSearch={() => {}}
            enterButton="Search"
          />
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            className={styles.buttonFiltersWrapperButton}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Space>
      )}
    </Layout>
  );
}
