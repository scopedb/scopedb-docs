"use client"

import { usePathname } from "next/navigation"
import { ConfigProvider, Menu, type MenuProps } from 'antd';
import { getSidebar, SidebarItem } from "@/sidebars";
import { useState } from "react";

type MenuItem = Required<MenuProps>['items'][number];

export default function Sidebar({ prefix, className }: { prefix: string, className?: string }) {
    const pathname = usePathname()
    const sidebar = getSidebar(pathname)!;

    const postings: { [link: string]: string[] } = {}
    let keyGenerator = 1;
    const traverseSidebar = (items: SidebarItem[], keyPath: string[] = []) => {
        return items.map(item => {
            const key = `${prefix}-${keyGenerator++}`;
            const currentKeyPath = [...keyPath, key];
            if (item.link) {
                postings[item.link] = currentKeyPath;
            }

            const children: MenuItem[] = [];
            if (item.items) {
                children.push(...traverseSidebar(item.items, currentKeyPath));
            }

            return {
                key: key,
                label: <>{item.link ? <a href={item.link}>{item.label}</a> : item.label}</>,
                children: children.length > 0 ? children : undefined,
            }
        })
    }

    const menuItems: MenuItem[] = traverseSidebar(sidebar);
    const selectedKeys = postings[pathname] || [];

    interface LevelKeysProps {
        key?: string;
        children?: LevelKeysProps[];
    }

    const getLevelKeys = (items1: LevelKeysProps[]) => {
        const key: Record<string, number> = {};
        const func = (items2: LevelKeysProps[], level = 1) => {
            items2.forEach((item) => {
                if (item.key) {
                    key[item.key] = level;
                }
                if (item.children) {
                    func(item.children, level + 1);
                }
            });
        };
        func(items1);
        return key;
    };

    const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);

    const [stateOpenKeys, setStateOpenKeys] = useState(selectedKeys);
    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);

        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            const newOpenKeys = openKeys
                // remove repeat key
                .filter((_, index) => index !== repeatIndex)
                // remove current level all child
                .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]);

            setStateOpenKeys(newOpenKeys);
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    }

    return <ConfigProvider
        theme={{
            components: {
                Menu: {
                    activeBarBorderWidth: 0,
                },
            },
        }}
    >
        <Menu
            mode="inline"
            items={menuItems}
            defaultOpenKeys={selectedKeys.slice(0, -1)}
            defaultSelectedKeys={selectedKeys}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            className={className}
        />
    </ConfigProvider>
}

