"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";
import { useHasPermission } from "@/utils/permissions";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon: LucideIcon;
        isActive?: boolean;
        permission?: string[];
        items?: {
            title: string;
            url: string;
            permission?: string;
        }[];
    }[];
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Navegação</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasPermission = item.permission
                        ? item.permission.some((permission) =>
                              useHasPermission(permission)
                          )
                        : true;

                    return (
                        hasPermission && (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={item.isActive}
                            >
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {item.items?.length ? (
                                        <>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                    <ChevronRight />
                                                    <span className="sr-only">
                                                        Toggle
                                                    </span>
                                                </SidebarMenuAction>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items.map(
                                                        (subItem: {
                                                            title: string;
                                                            url: string;
                                                            permission?: string;
                                                        }) => {
                                                            const subItemHasPermission =
                                                                subItem.permission
                                                                    ? useHasPermission(
                                                                          subItem.permission
                                                                      )
                                                                    : true;

                                                            return (
                                                                subItemHasPermission && (
                                                                    <SidebarMenuSubItem
                                                                        key={
                                                                            subItem.title
                                                                        }
                                                                    >
                                                                        <SidebarMenuSubButton
                                                                            asChild
                                                                        >
                                                                            <Link
                                                                                href={
                                                                                    subItem.url
                                                                                }
                                                                            >
                                                                                <span>
                                                                                    {
                                                                                        subItem.title
                                                                                    }
                                                                                </span>
                                                                            </Link>
                                                                        </SidebarMenuSubButton>
                                                                    </SidebarMenuSubItem>
                                                                )
                                                            );
                                                        }
                                                    )}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </>
                                    ) : null}
                                </SidebarMenuItem>
                            </Collapsible>
                        )
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
