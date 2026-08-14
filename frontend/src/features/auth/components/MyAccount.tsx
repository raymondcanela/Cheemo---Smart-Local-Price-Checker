import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

export default function MyAccount() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>My Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <p>{user?.name}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p>{user?.email}</p>
        </div>
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          Log out
        </Button>
      </CardContent>
    </Card>
  );
}