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

export default function MainNav(){
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${searchValue}`);
        let querystring ="";
        querystring += `title=true&q=${searchValue}`;
        setSearchHistory(current => [...current, querystring]);
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

    return(
        <>
          <Navbar bg="dark" variant="dark" expanded={isExpanded}>
            <Container>
              <Navbar.Brand>Neskines Otieno</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" onClick={handleNavClick}>
                  <Link href="/" passHref legacyBehavior><Nav.Link
                    active={router.pathname === "/"}
                    style={{color: router.pathname === "/" ? "cyan" : "" }}
                  >Home</Nav.Link></Link>
                  <Link href="/search" passHref legacyBehavior><Nav.Link
                    active={router.pathname === "/search"}
                    style={{color: router.pathname === "/search" ? "cyan" : "" }}
                  >Advanced Search</Nav.Link></Link>
                </Nav>
                  <Form className="d-flex" onSubmit={handleSubmit}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      value={searchValue}
                      onChange={handleInputChange}                            
                    />            
                    <Button variant="success" type ="submit">Search</Button>
                  </Form>&nbsp;
                    <Nav className="me-auto" onClick={handleNavClick}>                  
                      <NavDropdown title={<span style={{ color: "cyan" }}>User Name</span>}>
                        <Link href="/favourites" passHref legacyBehavior>
                          <NavDropdown.Item onClick={() => setIsExpanded(false)}
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
                      </NavDropdown>
                    </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
      <br />
      <br />
        </>
    )
}