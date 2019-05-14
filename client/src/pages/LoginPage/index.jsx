import React, { Component } from "react";
import Header from "./../../components/Header";
import PageTitle from "./../../components/PageTitle";
import Footer from "./../../components/Footer";
// import EventDesc from "./../../components/EventDesc";
import SectionMain from "./../../components/SectionMain";

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      // events: [
      //     {
      //         eventName: "Platform Front-end",
      //         adress: "@ Latte Pytho 12 Zybitskaya St., Minsk",
      //         eventFrequency: "every Monday, 16:00",
      //         subscribe: "Subscribe",
      //         key: 1,
      //     },
      //     {
      //         eventName: "Platform Back-end",
      //         adress: "@ Latte Pytho 12 Zybitskaya St., Minsk",
      //         eventFrequency: "every Monday, 16:00",
      //         subscribe: "Subscribe",
      //         key: 2,
      //     },
      //     {
      //         eventName: "Something event",
      //         adress: "Something adress",
      //         eventFrequency: "hz vasche",
      //         subscribe: "Unsubscribe",
      //         key: 3,
      //     },
      // ],
      userTelegramId: undefined,
    };
  }

  render() {
    // const { events } = this.state;

    console.log("id = " + this.state.userTelegramId);

    if (!!localStorage.getItem("telegramId") && !this.state.user) {
      const requestUrl =
        "https://forge-development.herokuapp.com/api/users/" +
        localStorage.getItem("telegramId");

      fetch(requestUrl)
        .then(blob => blob.json())
        .then(user => {
          console.log(user);

          this.setState({ user });
        });
    }

    // const PageTittle = () => {
    //     console.log("dot", this.state.userTelegramId)
    //     return (
    //       this.state.user ? (
    //         <PageTitle title={"Hello, " + this.state.user.username} desc="feel free at this website" />
    //       ) : (
    //         <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
    //       )
    //     );
    //   };

    return (
      <div>
        <Header />
        {this.state.user ? (
          <PageTitle
            title={"Hello, " + this.state.user.username}
            desc="feel free at this website"
          />
        ) : (
          <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
        )}
        <SectionMain />
        {/* <EventDesc events={events} /> */}
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    const telegramId = localStorage.getItem("telegramId");

    if (!telegramId) {
      const locationHash = !!this.props.location.search
        ? this.props.location.search
            .slice(1)
            .split("&")
            .map(s => s.split("="))
            .filter(v => v[0] === "id")[0][1]
        : undefined;
      console.log("lh", locationHash);
      console.log("props", this.props);
      console.log("Locsearch", this.props.location.search);
      localStorage.setItem("telegramId", locationHash);
      this.setState({
        userTelegramId: localStorage.getItem("telegramId"),
      });
    } else {
      this.setState({
        userTelegramId: telegramId,
      });
    }
  }
}
