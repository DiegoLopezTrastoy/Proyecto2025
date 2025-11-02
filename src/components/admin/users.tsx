"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  disableUser,
  enableUser,
  getUsersForAdmin,
  UserInAdmin,
} from "@/lib/prisma/prisma";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Ban } from "lucide-react";

interface props {
  filter: string;
}

export default function UsersAdminTab({ filter }: props) {
  const [users, setUsers] = useState<UserInAdmin[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInAdmin[]>([]);

  const loadUsers = () => {
    getUsersForAdmin().then((dbUsers) => {
      setUsers(dbUsers);
      setFilteredUsers(dbUsers);
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(() =>
      users.filter((val) => {
        return (
          val.email?.toLowerCase().includes(filter) ||
          val.name?.toLowerCase().includes(filter) ||
          val.role?.toLowerCase().includes(filter) ||
          val.state?.toLowerCase().includes(filter)
        );
      })
    );
  }, [filter]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Usuarios</CardTitle>
        <CardDescription>
          Administra los usuarios registrados en la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Partidas</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead>Metodo de inico de sesión</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length == 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-500 pt-8 text-xl"
                >
                  No hay usuarios registrados
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.games.length}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {user.hasPassword ? <Badge>Credenciales</Badge> : <></>}
                    {user.accounts.map((account) => {
                      return (
                        <Badge key={account.provider}>{account.provider}</Badge>
                      );
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.state == "ACTIVE" ? "default" : "destructive"
                      }
                    >
                      {user.state == "ACTIVE" ? "Activo" : "Bloqueado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant={
                        user.state == "ACTIVE" ? "destructive" : "default"
                      }
                      size="sm"
                      onClick={() =>
                        user.state == "ACTIVE"
                          ? disableUser(user.id).then(loadUsers)
                          : enableUser(user.id).then(loadUsers)
                      }
                    >
                      <Ban className="w-4 h-4 mr-1" />
                      {user.state == "ACTIVE" ? "Bloquear" : "Desbloquear"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
