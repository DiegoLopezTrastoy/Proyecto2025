"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Users,
  Database,
  Play,
  Search,
  Plus,
  Swords,
  UserPen,
  Sword,
  Shield,
  Wand,
  Lightbulb,
  Speech,
  BrainCog,
  BookUserIcon
} from "lucide-react";
import { toast } from "sonner";
import UsersAdminTab from "@/components/admin/users";
import GamesAdminTab from "@/components/admin/games";
import RazasAdminTab from "@/components/admin/razas";
import ClasesAdminTab from "@/components/admin/clases";
import EquipamientosAdminTab from "@/components/admin/equipamientos";
import ArmadurasAdminTab from "@/components/admin/armaduras";
import MagiasAdminTab from "@/components/admin/magias";
import HabilidadesAdminTab from "@/components/admin/habilidades";

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const tabsList = [
    {
      icon: <Users className="w-4 h-4"/>,
      label: "Usuarios",
      content: <UsersAdminTab filter={searchTerm}/>
    },{
      icon: <Play className="w-4 h-4"/>,
      label: "Partidas",
      content: <GamesAdminTab filter={searchTerm}/>
    },{
      icon: <UserPen className="w-4 h-4"/>,
      label: "Razas",
      content: <RazasAdminTab filter={searchTerm}/>
    },{
      icon: <Swords className="w-4 h-4"/>,
      label: "Clases",
      content: <ClasesAdminTab filter={searchTerm}/>
    },{
      icon: <Sword className="w-4 h-4"/>,
      label: "Equipamientos",
      content: <EquipamientosAdminTab filter={searchTerm}/>
    },{
      icon: <Shield className="w-4 h-4"/>,
      label: "Armaduras",
      content: <ArmadurasAdminTab filter={searchTerm}/>
    },{
      icon: <Wand className="w-4 h-4"/>,
      label: "Magias",
      content: <MagiasAdminTab filter={searchTerm}/>
    },{
      icon: <Lightbulb className="w-4 h-4"/>,
      label: "Habilidades",
      content: <HabilidadesAdminTab filter={searchTerm}/>
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Panel de Administración
        </h1>
        <p className="text-xl text-muted-foreground">
          Gestiona usuarios, partidas y contenido de IA
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>

    <Tabs className="w-full" defaultValue={tabsList[0].label}>
      <TabsList className="grid w-full grid-cols-8">
        {tabsList.map((tab, index) => {
          return (<TabsTrigger value={tab.label} className="flex items-center space-x-2" key={tab.label}>
            {tab.icon}
            <span>{tab.label}</span>
          </TabsTrigger>)
        })}
      </TabsList>
      {tabsList.map((tab, index) => {
          return (<TabsContent value={tab.label} className="space-y-4" key={tab.label}>
            {tab.content}
          </TabsContent>)
        })}
    </Tabs>

    </div>
  );
}
