import styles from './index.module.less';

const Home: React.FC<{}> = () => {
  return (
    <>
      <div>
        {JSON.stringify(styles)}
      </div>
      <div className={styles.home}>
        home
        <span className={styles.text}>这是内部text</span>
      </div>
      <span className={styles.text}>这是外部text</span>
    </>
  )
}

export default Home;