import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Header from './common/Header';
import CoursesPage from './CoursesPage';
import PageNotFound from './PageNotFound';
import ManageCoursePage from "./ManageCoursePage";

export default function App() {

  return (<div className="container-fluid">
    <ToastContainer autoClose={3000} hideProgressBar />
    <Header />
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/courses/:slug' component={ManageCoursePage} />
      <Route path='/courses/new' component={ManageCoursePage} />
      <Route path='/courses' component={CoursesPage} />
      <Route path='/about' component={AboutPage} />
      <Redirect from='about-page' to='about' />
      <Route component={PageNotFound} />
    </Switch>
  </div>)
}