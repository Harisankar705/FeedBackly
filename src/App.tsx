import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import SurveyForm from "@/pages/survey-form";
import AdminDashboard from "@/pages/admin-dashboard";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useAuthStore } from "./store/authStore";


function Router() {
  const {isAuthenticated}=useAuthStore()
  return (
    <Switch>
      <Route path="/" component={SurveyForm} />
      <Route path="/admin">
        {isAuthenticated ? <AdminDashboard /> : <Redirect to="/" />}
      </Route>      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route  path='*' component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
    </QueryClientProvider>
  );
}

export default App;
