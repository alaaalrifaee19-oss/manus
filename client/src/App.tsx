import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import About from "./pages/About";
import { Instructors, InstructorProfile } from "./pages/Instructors";
import { Blog, BlogPostDetails, FAQ, Contact } from "./pages/ContentPages";
import Gallery from "./pages/Gallery";
import { LegalPrivacy, LegalTerms } from "./pages/VerificationAndLegal";
import { StudentDashboard } from "./pages/StudentDashboard";
import { LearningPlayer, QuizPage } from "./pages/LearningPlayer";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Login, Register } from "./pages/AuthPages";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:slug" component={CourseDetails} />
      <Route path="/instructors" component={Instructors} />
      <Route path="/instructors/:slug" component={InstructorProfile} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPostDetails} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/privacy" component={LegalPrivacy} />
      <Route path="/terms" component={LegalTerms} />

      {/* Auth */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      {/* Student LMS & Dashboard */}
      <Route path="/dashboard" component={StudentDashboard} />
      <Route path="/learn/:courseId" component={LearningPlayer} />
      <Route path="/quiz/:quizId" component={QuizPage} />

      {/* Admin Dashboard */}
      <Route path="/admin" component={AdminDashboard} />

      {/* 404 Fallback */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
