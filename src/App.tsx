
import { any } from 'joi';
import { createContext, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import IsBizOnly from './Auth/isBizOnly';
import RouteGuard from './Auth/RouteGuard';
import Signin from './Auth/Signin';
import Signup from './Auth/Signup';
import { setToken } from './Auth/Token';
import AllCardsList from './components/AllCardsList';
import Business from './components/Business';
import Businesscard from './components/Businesscard';
import Footer from './components/Footer';
import Header from './components/Header';
import MyFavorCards from './components/MyFavorCards';
import OneCard from './components/OneCard';
import About from './pages/About';
import CardsList from './pages/CardsList';
import Edit from './pages/Edit';
import Home from './pages/Home';
import { postRequest } from './services/apiService';

interface ISignupDatar {
  email: string,
  password: string,
  // isBiz?: Boolean,
}
interface Context {
  isBiz: boolean;
  handleLogout: Function;
  signin: Function;
  userName: string;

  // isAdmin: boolean;
}
export const AppContext = createContext<Context | null>(null);

function App() {
  const [isBiz, setISBiz] = useState<boolean>(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');

  function signin(data: ISignupDatar) {
    const res = postRequest(
      'users/signin',
      data,
      false

    );
    if (!res) return;
    res.then(response => response.json())
      .then(json => {
        if (json.error) {
          console.log('Hello')
        } else {
          setToken(json.token);
          setUserName(json.user)
          setISBiz(json.isBiz);
          setUserName(json.id)
          navigate('/businesscard')
        }
      }).catch((error) => {
        console.log(error)
      }
      )
  }


  function handleLogout() {
    setISBiz(false);
    setUserName('');
    navigate('/signin')
  }

  return (

    <>

      <AppContext.Provider value={{
        isBiz,
        userName,
        handleLogout,
        signin
      }}>


        <Header />
        <ToastContainer />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/allcardslist'
            element={<AllCardsList title={''} subTitle={''} address={''} phone={''} image={{
              url: '',
              alt: ''
            }} category={''} CategoryClick={any} />}
          />

          <Route
            path='/signup'
            element={<Signup />}
          />
          <Route
            path='/signin'
            element={<Signin handler={signin} />}
          />
          <Route
            path='/cardslist'
            element={
              <RouteGuard>
                <CardsList />
              </RouteGuard>
            }
          />
          <Route
            path='/business'
            element={<Business />}
          />
          <Route
            path='/myFavorCards'
            element={<MyFavorCards />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/oneCard/:id'
            element={<OneCard />}
          />
          <Route
            path='/businesscard'
            element={<Businesscard />}
          />

          <Route
            path='/edit/:id'
            element={<RouteGuard>
              <Edit />
            </RouteGuard>}
          />

          <Route
            path='/isBiz'
            element={<IsBizOnly />}
          />

        </Routes>


        <Footer />
      </AppContext.Provider>

    </>
  );
}

export default App;
