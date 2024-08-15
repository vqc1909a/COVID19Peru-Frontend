import React, {useMemo, useRef} from 'react';
import styled from '@emotion/styled';
import MainContent from '../components/Developer/MainContent';
import Aside from '../components/Developer/Aside';
import useSeo from '../hooks/useSeo';
import DarkMode from '../components/DarkMode';
// import ScrollUp from '../components/ScrollUp';

const Developer = () => {
  const main_content = useRef();

  const SectionContainer = useMemo(()=> {
    return styled.section`
      min-height: 100vh;

      @media only screen and (min-width: 1024px){
        display: flex;
      }
      .main-content{
        @media only screen and (min-width: 1024px){
          flex: 8; 
        }
        order: 2;
        padding: 2.5rem;
        background-color: #3B3B3B;
        transition: background-color .5s ease-in-out;
        &.dark-mode{
          background-color: #b7b0b0;
        }
        h1, h2{
          padding-bottom: 1rem;
          transition: color .5s ease-in-out;
          letter-spacing: 3px;
        }
        h2{
          margin-top: 4rem;
        }
        h3{
          margin-top: 2.5rem;
        }
        hr{
          color: red;
          height: 3px;
          background-color: #100e0e;
          border: none;
          transition: background-color .5s ease-in-out;
          margin-bottom: 2rem;
          &.dark-mode{
            background-color: #f5f3f3;
          }
        }
        .intro{
          margin-top: 1rem;
          p{
            transition: color .5s ease-in-out;
            font-family: 'Rubik Light';
            margin-bottom: 1rem;
          }
          li{
            font-family: 'Rubik Light';
            margin-top: 2rem;
            margin-bottom: 2rem;
            transition: color .5s ease-in-out;
            span{
              font-family: 'Rubik Regular';
              display: inline-block;
              margin-bottom: 1rem;
              transition: color .5s ease-in-out;
            }
            ul{
              margin-left: 3rem;
              li{
                list-style: initial;
                margin-bottom: 1rem;
                margin-top: 0rem;

              }
            }
          }
          a{
            text-decoration: initial;
            transition: color .5s ease-in-out;
          }
        }
        .limit{
          font-family: 'Rubik Light';
          margin-bottom: 2rem;
          h3{
            margin-bottom: 1rem;
          }
          color: transition .5s ease-in-out;
        }
        .code{
          margin-bottom: 3rem;
          font-family: 'Rubik Light';
          transItion: color .5s ease-in-out;
          h3{
            margin: 1rem 0;
          }
          .request, .response{
            margin: 1rem 0;
            padding: 1rem;
            background-color: #f7f5f5;
            color: #100e0e;
            font-family: 'Rubik Regular';
            p{
              margin: 0;
            }
          }
          .response{
            margin-left: 1.5rem;
          }
          &__up{
            margin: 1rem 0rem 1rem 0rem;
          }
          &__down{
            margin: 1rem 0rem 2rem 1.5rem;
            font-size: calc(0.6rem + 0.5vw);
          }
        }
        .table-small{
          font-size: calc(0.8rem + 0.5vw);
        }
      }
      .sidebar{
        display: none;
        @media only screen and (min-width: 1024px){
          flex: 2; 
          display: initial;
        }
        order: 1;
        padding: 1.5rem;
        transition: background-color .5s ease-in-out;
        div{
          margin-bottom: 2rem;
          h2{
            margin-bottom: 1rem;
            letter-spacing: 2px;
            transition: color .5s ease-in-out;
            cursor: pointer;
          }
          p{
            margin-bottom: 1rem;
            margin-left: 1.5rem;
            span{
              display: inline-block;
              position: relative;
              cursor: pointer;
              transition: color .3s ease-in-out;
              &::after{
                content: '';
                position: absolute;
                bottom: -3px;
                left: 0;
                right: 0;
                height: 3px;
                background-color: #df3333;
                transform: scaleX(0);
                transform-origin: left center;
                transition: transform .3s ease-in-out;
              }
              &:hover{
                &::after{
                  transform: scaleX(1);
                }
              }

            }
          }
        }
      }
    `
  }, []); 
  
  useSeo({title: "Developer | API Covid19 - Perú"})

  const scrollDown = (e) => {
    const height_navbar = document.querySelector(".navbar").getBoundingClientRect().height;  
    const distance = document.querySelector(`.${e.currentTarget.dataset.class}`).getBoundingClientRect().top;
    main_content.current.scrollTo({top: distance + main_content.current.scrollTop - height_navbar, behavior: "smooth"});
  }
      
  return (
    <>
      <SectionContainer>
        <DarkMode />
        <MainContent main_content={main_content} ></MainContent>
        <Aside scrollDown={scrollDown}></Aside>
      </SectionContainer>
    </>
    
  );
}
 
export default Developer;
