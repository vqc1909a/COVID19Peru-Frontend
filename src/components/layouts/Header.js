import React, {useContext, useMemo} from 'react';
import styled from '@emotion/styled';
import {DarkModeContext} from '../../context/DarkModeContext';
import {withRouter, Link} from 'react-router-dom';
const Header = () => {
  const {isDarkMode, setIsDarkMode} = useContext(DarkModeContext);

  const HeaderContainer = useMemo(() => {
    return styled.header`
      box-shadow: 0px 3px 10px rgba(0,0,0,.1);
      z-index: 2;
      position: sticky;
      top: 0;
      width: 100%;
      display: none;
      transition: all .5s ease-in-out;
      @media (min-width: 992px){
          display: block;
      }
      .navbar{
        min-height: 10vh;
        padding: 1rem 0;  
        display: flex;
        align-items: center;
        .logo{
          flex: 1;
          a{
          display: flex;
          align-items: center;
          img{
            display: inline-block;
            margin-right: 2rem;
          }
          h1{
            transition: color .5s ease-in-out;
          }
          }
        }
        .nav{
          flex: 1;
          ul{
            display: flex;
            li{
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            li:nth-of-type(4){
              div{
                background-color: #B7B0B0;
                height: 25px;
                width: 65px;
                position: relative;                
                border-radius: 10px;
                transition: background-color .5s ease-in-out;
                span{
                  position: absolute;
                  left: -5px;
                  top: -20%;
                  display: flex;
                  align-items: center;
                  justify-content:center;
                  /* background-color: #544A4A; */
                  padding: .6rem;
                  border-radius: 50%;
                  cursor: pointer;
                  transition: background-color .5s ease-in-out;
                  &.span-mode-dark{
                    animation: spanmodedark .5s ease-in-out forwards;
                  }
                  &.span-mode-light{
                    animation: spanmodelight .5s ease-in-out forwards;
                  }
                  img{
                    &.imgmodedark{
                      animation: imgmodedark .5s ease-in-out forwards;
                    }
                    &.imgmodelight{
                      animation: imgmodelight .5s ease-in-out forwards;
                    }
                  }
                }
                &.div-dark{
                  background-color: #544A4A;
                }
              }
            }
          }
        }
        @keyframes spanmodedark {
          from{
            transform: translateX(0px);
          }
          to{
            transform: translateX(calc(75px - 100%));
            
          }
        };
         @keyframes imgmodedark {
          0%{
            transform: rotate(0deg) scale(1);
          }
          50%{
            transform: rotate(180deg) scale(0);
          }
          100%{
            transform: rotate(360deg) scale(1);
          }
        };
        @keyframes spanmodelight {
          from{
            transform: translateX(calc(75px - 100%));
          }
          to{
            transform: translateX(0px);
          }
        };

         @keyframes imgmodelight {
          0%{
            transform: rotate(0deg) scale(1);
          }
          50%{
            transform: rotate(-180deg) scale(0);
          }
          100%{
            transform: rotate(-360deg) scale(1);
          }
        };
      };
    `
  }, []);

  const cambiarThema = (e) => {
    const span = e.currentTarget;
    const img = span.childNodes[0];
    // const mapaBackground = document.querySelector('.leaflet-container');
    if(!isDarkMode){     
      span.classList.remove('span-mode-light');
      img.classList.remove('imgmodelight');
      span.classList.add('span-mode-dark');
      img.classList.add('imgmodedark');
      setTimeout(()=>{
        img.src = "/icons/sundarkmode.svg"
      }, 250)
      setIsDarkMode(!isDarkMode);
      // mapaBackground.classList.add('mapa-dark');

    }else{
      span.classList.remove('span-mode-dark');
      img.classList.remove('imgmodedark');
      span.classList.add('span-mode-light');
      img.classList.add('imgmodelight');
      setTimeout(()=>{
        img.src = "/icons/moondarkmode.svg"
      }, 250)
      setIsDarkMode(!isDarkMode);
      // mapaBackground.classList.remove('mapa-dark');

    }
  }
  return (
    <HeaderContainer className={isDarkMode ? 'background-dark text-primary-dark' : 'background text-primary'}>
    
      <div className="navbar container">
        <div className="logo">
          <Link to="/" without="true">
              <img src="/icons/logo.svg" alt="logo"></img>
              <h1 className={`text-medium ${isDarkMode ? 'text-secondary-dark' : 'text-secondary'}`}>Covid19-Perú</h1>
          </Link>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/mapa" without="true" className={isDarkMode ? 'text-secondary-dark' : 'text-secondary'}>Mapa</Link>
            </li>
            <li>
              <Link to="/busqueda" without="true" className={isDarkMode ? 'text-secondary-dark' : 'text-secondary'}>Explorar</Link>
            </li>
            <li>
              <Link to="/api" without="true" className={isDarkMode ? 'text-secondary-dark' : 'text-secondary'}>API</Link>
            </li>
            <li>
              <div className={isDarkMode ? 'div-dark' : ''}>
                <span onClick={(e) => cambiarThema(e)} style={isDarkMode ? {backgroundColor: "#B7B0B0"} : {backgroundColor: "#544A4A"}}>
                  <img src='/icons/moondarkmode.svg' alt="moondark-icon" />                  
                </span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </HeaderContainer>
  );
}
 
export default withRouter(Header);