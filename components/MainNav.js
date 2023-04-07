import { useRouter } from 'next/router';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';


export default function MainNav(){
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const token = readToken();


    const handleSubmit = async (e) => {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${searchValue}`);
        let querystring ="";
        querystring += `title=true&q=${searchValue}`;
        setSearchHistory(await addToHistory(`title=true&q=${searchValue}`))
        setIsExpanded(false);        
      };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
      };

      const handleToggle = () => {
        setIsExpanded(!isExpanded);
      };

    const handleNavClick = () => {
      setIsExpanded(false);
    };

    const logout = () => {
      setIsExpanded(false);
      removeToken();
      router.push('/Login');
  };

    return(
        <>
        <Navbar bg="dark" variant="dark" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Neskines Otieno</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="basic-navbar-nav">          
            <Nav className="me-auto" onClick={handleNavClick}>
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  style={{ color: router.pathname === "/" ? "cyan" : "" }}
                >Home</Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    style={{ color: router.pathname === "/search" ? "cyan" : "" }}
                  >Advanced Search</Nav.Link>
                </Link>
              )}
            </Nav>
            {token && (
              <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchValue}
                  onChange={handleInputChange}
                />
                <Button variant="success" type="submit">Search</Button>
              </Form>
            )}
            <Nav className="me-auto" onClick={handleNavClick}>
              {token && (
                <NavDropdown title={<span style={{ color: "cyan" }}>{token.userName}</span>}>
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      onClick={() => setIsExpanded(false)}
                      active={router.pathname === "/favourites"}
                      style={{
                        color: router.pathname === "/favourites" ? "cyan" : "",
                        backgroundColor: router.pathname === "/favourites" ? "black" : "",
                      }}
                    >Favourites</NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      onClick={() => setIsExpanded(false)}
                      active={router.pathname === "/history"}
                      style={{
                        color: router.pathname === "/history" ? "cyan" : "",
                        backgroundColor: router.pathname === "/history" ? "black" : "",
                      }}
                    >Search History</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>  
            
            </Navbar.Collapse>                    
            {!token && (
              <Nav className="me-auto" onClick={handleNavClick}>
                  <Link href="/register" passHref legacyBehavior><Nav.Link
                    active={router.pathname === "/register"}
                    style={{color: router.pathname === "/register" ? "cyan" : "" }}
                    onClick={() => setIsExpanded(false)}
                    >Register</Nav.Link></Link>
                  <Link href="/Login" passHref legacyBehavior><Nav.Link
                      active={router.pathname === "/Login"}
                      style={{color: router.pathname === "/Login" ? "cyan" : "" }}
                      onClick={() => setIsExpanded(false)}
                  >Log in</Nav.Link></Link>
              </Nav>
              )}
                  </Container>
                </Navbar>
              <br />
              <br />
            </>
          );
        }                      
