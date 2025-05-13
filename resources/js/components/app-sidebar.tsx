"use client"

import * as React from "react"
import { Handshake, Home, Scale, Users, Webcam } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import logo from "@/assets/images/logo.png";

const data = {
    navMain: [
        {
            title: "Início",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "Colaboradores",
            url: "/collaborators",
            icon: Handshake,
            permission: ["1"]
        },
        {
            title: "Audiências",
            url: "/roles",
            icon: Webcam,
            permission: ["1", "2"]
        },
        {
            title: "Processos",
            url: "/processes",
            icon: Scale,
            permission: ["1", "2"]
        },
        {
            title: "Clientes",
            url: "/clients",
            icon: Users,
            permission: ["1", "2"]
        }
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<PageProps>().props;

    return (
        <Sidebar collapsible="icon" variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-4">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                                <img src={logo} alt="Conecta Networks" className="rounded-lg" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Sousa Alencar Advocacia</span>
                                <span className="truncate text-xs">Sistema de Audiências</span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
