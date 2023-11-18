import { BrowserRouter as Router, Route, Link, Routes, useParams } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { ROUTES } from 'utils/routes';
import { HomePage } from 'views/Home/HomePage/HomePage';
import { ProblemsPage } from 'views/Problems/ProblemsPage/ProblemsPage';
import { SignUpPage } from 'views/SignUp/SignUpPage/SignUpPage';
import { LoginPage } from 'views/Login/LoginPage/LoginPage';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ProblemPage } from 'views/Problems/ProblemPage/ProblemPage';
import { FourOhFour } from 'views/FourOhFour/FourOhFour';


function desanitizeTitleFromURL(title) {
    // Replace hyphens with spaces and capitalize words
    // SYKE: do not capitalize words until we figure out some way to know which
    // ones were NOT capitalized in the original title
    return title.replace(/-/g, ' ');//.replace(/\b\w/g, word => word.toUpperCase());
}

function ProblemPageWrapper() {
    let { problemTitle } = useParams(); // Extract the dynamic part of the URL
    // Decode the problem title (was sanitized for URL)
    problemTitle = desanitizeTitleFromURL(problemTitle)
    return <ProblemPage problemTitle={problemTitle} />;
}

function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to={ROUTES.HOME}>
              <img src="/favicon-32x32.png" width="25" alt="Logo" />
              iCode
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={ROUTES.PROBLEMS_ALL}>
                  Problems
                </Nav.Link>
                <Nav.Link as={Link} to={ROUTES.LOGIN}>
                  Log In
                </Nav.Link>
                <Nav.Link as={Link} to={ROUTES.SIGNUP}>
                  Sign Up
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path={ROUTES.ROOT} element={<HomePage />} />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          {/* <Route path={`${ROUTES.PROBLEM}/:problemTitle`} element={<ProblemPageWrapper />} /> */}
          <Route path={`${ROUTES.PROBLEM}/:problemSlug`} element={<ProblemPage />} />
          <Route path={ROUTES.PROBLEMS_ALL} element={<ProblemsPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.OTHER} element={<FourOhFour />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
