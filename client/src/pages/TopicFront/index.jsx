import React, { Component } from "react";
import Header from "../../modules/Header";
import PageTitle from "../../modules/PageTitle";
import styles from "./styles.module.scss";
import Map from "../../events/components/Map";
import Button from "../../modules/Button";
import Footer from "../../modules/Footer";

const TopicFront = () => {
  return (
    <div>
      <Header />
      <PageTitle title={`Platform Front-end`} />
      <div className={`${styles.wrapper} ${styles.shadow_container}`} />
      <div className={styles.wrapper}>
        <div className={styles.section_container}>
          <div className={styles.section_header}>
            <h2>Topic Topic</h2>
            <Button text={"Subscribe"} />
          </div>
          <p className={styles.section__descr}>
            subscribe to this topic and try random coffee to improve your skills
            and discuss any specific questions with another colleagues at some
            warm lamp place
          </p>
          <div className={styles.section__place}>
            <h3 className={styles.section__topic__title}>place</h3>
            <p className={styles.place__descr}>
              @ Latte Python 12 Zybitskaya St., Minsk
            </p>
          </div>
          <div className={styles.time__descr}>
            <h3 className={styles.section__topic__title}>time</h3>
            <p className={styles.time__descr}>every Monday, 16:00</p>
          </div>
          <div className={styles.map__descr}>
            <h3 className={styles.section__topic__title}>map</h3>
            <Map location={[-8.369326, 115.166023]} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default TopicFront;
