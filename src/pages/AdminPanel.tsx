import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import { campaignsData } from "@/data/campaignsData";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Trash2, UserPlus, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Sample users data
const initialUsers = [
  { id: 1, name: "Jean Dupont", email: "jean@example.com", role: "Utilisateur" },
  { id: 2, name: "Marie Martin", email: "marie@example.com", role: "Administrateur" },
  { id: 3, name: "Pierre Durand", email: "pierre@example.com", role: "Utilisateur" }
];

const AdminPanel: React.FC = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, isAuthenticated, login } = useAuth();
  const [managedCampaigns, setManagedCampaigns] = useState([...campaignsData]);
  const navigate = useNavigate();
  
  // Get users from localStorage or use initial data
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  
  // New user form state
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "Utilisateur" });
  const [editUser, setEditUser] = useState<null | { id: number, name: string, email: string, role: string }>(null);

  useEffect(() => {
    // Check if user is admin
    if (isAuthenticated && user?.role !== "Administrateur") {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'accès à cette page.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [isAuthenticated, user, navigate, toast]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  const handleDeleteCampaign = (campaignId: number) => {
    setManagedCampaigns(managedCampaigns.filter(campaign => campaign.id !== campaignId));
    toast({
      title: "Campagne supprimée",
      description: `La campagne a été supprimée avec succès.`,
      variant: "default"
    });
  };

  const handleViewCampaign = (campaignSlug: string) => {
    navigate(`/campaign/${campaignSlug}`);
  };

  // User management functions
  const handleAddUser = () => {
    const newId = users.length > 0 ? Math.max(...users.map((user: any) => user.id)) + 1 : 1;
    const updatedUsers = [...users, { id: newId, ...newUser }];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setNewUser({ name: "", email: "", password: "", role: "Utilisateur" });
    toast({
      title: "Utilisateur ajouté",
      description: `L'utilisateur ${newUser.name} a été ajouté avec succès.`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter((user: any) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès.",
    });
  };

  const handleEditUser = (user: { id: number, name: string, email: string, role: string }) => {
    setEditUser({ ...user });
  };

  const handleUpdateUser = () => {
    if (editUser) {
      const updatedUsers = users.map((user: any) => user.id === editUser.id ? { ...user, ...editUser } : user);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setEditUser(null);
      toast({
        title: "Utilisateur mis à jour",
        description: "Les informations de l'utilisateur ont été mises à jour avec succès.",
      });
    }
  };

  if (!isAuthenticated || (isAuthenticated && user?.role !== "Administrateur")) {
    return (
      <Layout>
        <div className="container py-12 px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Panneau d'administration</CardTitle>
                <CardDescription>Connectez-vous pour accéder au panneau d'administration</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium">
                      Email
                    </label>
                    <Input 
                      id="username"
                      type="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Mot de passe
                    </label>
                    <Input 
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Se connecter</Button>
                </form>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  * Pour cette démo, utilisez "admin@example.com" comme email et "admin123" comme mot de passe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panneau d'administration</h1>
        </div>

        <Tabs defaultValue="campagnes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campagnes">Campagnes</TabsTrigger>
            <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
            <TabsTrigger value="parametres">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="campagnes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des campagnes</CardTitle>
                <CardDescription>
                  Gérez les campagnes sur la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Titre</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Objectif</TableHead>
                      <TableHead>Collecté</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {managedCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>{campaign.id}</TableCell>
                        <TableCell>{campaign.title}</TableCell>
                        <TableCell>{campaign.category}</TableCell>
                        <TableCell>{campaign.goal} TND</TableCell>
                        <TableCell>{campaign.raised} TND</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewCampaign(campaign.slug)}>
                              <Eye className="h-4 w-4 mr-1" /> Voir
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette campagne ?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Cette action est irréversible. La campagne "{campaign.title}" sera définitivement supprimée.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteCampaign(campaign.id)}>
                                    Confirmer la suppression
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="utilisateurs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                  <CardDescription>Gérez les utilisateurs de la plateforme</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Ajouter un utilisateur
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un utilisateur</DialogTitle>
                      <DialogDescription>
                        Remplissez le formulaire pour ajouter un nouvel utilisateur.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">
                          Nom
                        </label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="password" className="text-right">
                          Mot de passe
                        </label>
                        <Input
                          id="password"
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="role" className="text-right">
                          Rôle
                        </label>
                        <select 
                          id="role"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={newUser.role}
                          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                        >
                          <option value="Utilisateur">Utilisateur</option>
                          <option value="Administrateur">Administrateur</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddUser}>Enregistrer</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user: any) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                                  <Edit className="h-4 w-4 mr-1" /> Modifier
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Modifier l'utilisateur</DialogTitle>
                                  <DialogDescription>
                                    Modifiez les informations de l'utilisateur.
                                  </DialogDescription>
                                </DialogHeader>
                                {editUser && (
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <label htmlFor="edit-name" className="text-right">
                                        Nom
                                      </label>
                                      <Input
                                        id="edit-name"
                                        value={editUser.name}
                                        onChange={(e) => setEditUser({...editUser, name: e.target.value})}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <label htmlFor="edit-email" className="text-right">
                                        Email
                                      </label>
                                      <Input
                                        id="edit-email"
                                        type="email"
                                        value={editUser.email}
                                        onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <label htmlFor="edit-role" className="text-right">
                                        Rôle
                                      </label>
                                      <select 
                                        id="edit-role"
                                        className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={editUser.role}
                                        onChange={(e) => setEditUser({...editUser, role: e.target.value})}
                                      >
                                        <option value="Utilisateur">Utilisateur</option>
                                        <option value="Administrateur">Administrateur</option>
                                      </select>
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button onClick={handleUpdateUser}>Enregistrer les modifications</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Cette action est irréversible. L'utilisateur "{user.name}" sera définitivement supprimé.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                                    Confirmer la suppression
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parametres">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du site</CardTitle>
                <CardDescription>Configuration générale de la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="siteName" className="text-sm font-medium">
                      Nom du site
                    </label>
                    <Input 
                      id="siteName"
                      defaultValue="Plateforme de financement"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="currency" className="text-sm font-medium">
                      Devise
                    </label>
                    <Input 
                      id="currency"
                      defaultValue="TND"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {
                  toast({
                    title: "Paramètres enregistrés",
                    description: "Les paramètres du site ont été mis à jour."
                  });
                }}>
                  Enregistrer les modifications
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPanel;
