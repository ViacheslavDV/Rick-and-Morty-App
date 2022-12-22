import styles from "./Home.module.css";

const Home: React.FC = () => {
 return (
  <div className={styles.wrapper}>
   <h2 className={styles.header}>Welcome, welcome!</h2>
   <h3 className={styles.text}>We have been waiting for you, multidimensional creature.</h3>
   <h3 className={styles.text}>No time for introduction, just check the sections above.</h3>
   <div className={styles.background}>
    <span className={styles.star}></span>
    <span className={styles.star1}></span>
    <span className={styles.star2}></span>
   </div>
  </div>
 );
};

export default Home;
