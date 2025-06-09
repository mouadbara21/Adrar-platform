import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import Logo from '../components/Logo';
import { User, Key, Mail, Search, ArrowLeft } from 'lucide-react';
import { toast } from '../components/ui/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('hiker');
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez implémenter la logique d'authentification réelle
    console.log('Login attempt with:', { email, password });
    
    // Simulation de connexion réussie
    toast({
      title: "Connexion réussie",
      description: "Vous êtes maintenant connecté",
    });
    
    // Redirection selon le type d'utilisateur
    setTimeout(() => {
      if (userType === 'guide') {
        navigate("/guide-profile");
      } else if (userType === 'refuge') {
        navigate("/refuge-manager");
      } else {
        window.location.href = "http://votre-url-personnalisee.com";
        // Alternative avec React Router (décommentez la ligne ci-dessous et commentez celle au-dessus)
        // navigate("/your-home-page");
      }
    }, 1500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez implémenter la logique d'inscription réelle
    console.log('Signup attempt with:', { name, email, password, userType });
    
    // Simulation d'inscription réussie
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès",
    });
    
    // Redirection selon le type d'utilisateur
    setTimeout(() => {
      if (userType === 'guide') {
        navigate("/guide-profile");
      } else if (userType === 'refuge') {
        navigate("/refuge-manager");
      } else {
        window.location.href = "http://votre-url-personnalisee.com";
        // Alternative avec React Router (décommentez la ligne ci-dessous et commentez celle au-dessus)
        // navigate("/your-home-page");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

          {/* Bouton retour à l'accueil */}
      <div className="absolute top-4 left-4 z-20">
        <Link to="/">
          <button className="flex items-center gap-2 text-sm bg-easyhike-green text-white py-1.5 px-3 rounded-md hover:bg-easyhike-light-green transition shadow">
            <ArrowLeft size={16} />
            Retour à l'accueil
          </button>
        </Link>
      </div>


      {/* Left side - Image and Branding */}
    <div
      className="md:w-2/3 relative flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/homepage.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      <div className="relative z-10 text-white text-left px-8 max-w-2xl">
        <h1 className="text-6xl font-bold tracking-tight mb-6">
          HIKE.<br />
          DISCOVERER.<br />
          <span className="text-adrar-green">REPEAT.</span>
        </h1>
        <p className="text-xl mb-8">Find your next hike</p>
        <div className="flex justify-start">
          <div className="relative max-w-md w-full">
            <Input
              type="text"
              placeholder="Search by park, peak, or name"
              className="pl-10 pr-4 py-2 bg-white/90 text-gray-700 w-full rounded-full"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          </div>
        </div>
        <Link to="/trails">
          <button className="mt-6 bg-adrar-green hover:bg-adrar-dark-green text-white py-2 px-4 rounded-md">
            Discover trails →
          </button>
        </Link>
      </div>
    </div>


      {/* Right side - Login Form */}
      <div className="md:w-1/3 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>
                    Sign in to your account to continue your adventures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-easyhike-gray" size={16} />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 text-easyhike-gray" size={16} />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-easyhike-green hover:bg-easyhike-light-green"
                    >
                      Login
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="link" asChild>
                    <Link to="/forgot-password">Forgot password?</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Join our community to discover amazing trails
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-easyhike-gray" size={16} />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-easyhike-gray" size={16} />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 text-easyhike-gray" size={16} />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-type">I am a</Label>
                      <select
                        id="user-type"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="hiker">Hiker</option>
                        <option value="guide">Guide</option>
                        <option value="refuge">Refuge Manager</option>
                      </select>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-easyhike-green hover:bg-easyhike-light-green"
                    >
                      Sign Up
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-easyhike-gray">
                    By signing up, you agree to our{' '}
                    <Link to="/terms" className="text-easyhike-green hover:underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-easyhike-green hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
