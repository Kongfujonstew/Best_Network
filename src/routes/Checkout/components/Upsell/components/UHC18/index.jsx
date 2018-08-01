/* eslint-disable */
import React, { PureComponent } from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Link from 'react-router-dom';
import speakers from './speakers';
import styles from '../styles.scss';
const contentUrl = process.env.USER_CONTENT_URL;

export default (props) => {
  return (
    <Grid container spacing={0} justify={'center'} alignItems="center">
      <Grid xs={12} className={`${styles.banner} ${styles.bannerHeader}`}>
        <Grid container spacing={0} className={styles.container}>
          <Grid xs={12}>
            <Typography className={`${styles.whiteText} ${styles.text700} ${styles.text2Xl}`}>Congratulations on your purchase!</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography className={`${styles.whiteText} ${styles.textLg}`}>Here's one more opportunity for you to consider.</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <div className={styles.fixedBackground}>
            <div className={styles.videoContainer+" "+styles.container}>
              <div className={styles.videoContainerInner}>
                <iframe className={styles.video}
                  src="https://www.youtube.com/embed/kSWZKZeoR5M?wmode=opaque&showinfo=0&autoplay=1&controls=1&modestbranding=1&vq=&rel=0&playsinline=1"
                  frameBorder="0"
                  width="640"
                  height="480"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
        </div>
      </Grid>
      <Grid item xs={12} className={`${styles.bgDarkGrey} ${styles.sectionHeader}`}>
        <Grid container spacing={0} className={styles.container}>
          <Grid xs={12}>
            <Typography className={`${styles.whiteText} ${styles.textXl} ${styles.text700}`}>The Food Revolution Ultimate Health Collection</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{marginBottom: "2em"}}>
        <Grid container spacing={0} className={`${styles.container} ${styles.centerText}`}>
          <Grid xs={12}>
            <Typography className={styles.textLg} style={{paddingBottom: "1em"}}>If your biggest motivation in joining the Food Revolution Summit is health and vitality, then this special offer is for you!</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography className={styles.textLg} style={{paddingBottom: "1em"}}>This opportunity will never be available again at this price after you close this page.</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography className={`${styles.textXl} ${styles.text700} ${styles.textUppercase}`}>The Ultimate Health Collection includes John Robbins interviewing:</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} className={styles.speakers + ' ' + styles.speakersBackground}>
        <Grid container spacing={0} justify={'center'} className={styles.container}>
          { speakers.map(column => {
              return (
                <Grid xs={12} className={styles.speakerColumn} style={{marginBottom: "2em"}}>
                  <Grid container spacing={0} justify={'center'}>
                    <Grid xs={12} sm={8} sm-offset={2} style={{marginBottom: "1em"}}>
                      <Typography className={`${styles.centerText} ${styles.text700} ${styles.textLg} ${styles.bgInk}`}>{column.title}</Typography>
                    </Grid>
                  </Grid>
                  <Grid xs={12}>
                    <Grid container spacing={0}>
                      { column.speakers.map(speaker => {
                          const backgroundImage = 'url(' + props.contentUrl + speaker.pic + ')';
                          return (
                            <Grid xs={12} sm={3}>
                              <Grid container spacing={0} justify={'center'}>
                                <Grid xs={12}>
                                  <div className={styles.speakerWrap}>
                                    <div className={styles.speakerImage}>
                                        <img className={`${styles.speakerHeadshot} ${styles.centerBlock}`} src={`${props.contentUrl}${speaker.pic}`} />
                                    </div>
                                    <div className={styles.speakerDetails}>
                                      <Typography className={`${styles.text700} ${styles.textXs}`}>{speaker.name}</Typography>
                                      <Typography className={`${styles.text2Xs}`} style={{marginTop: "0.5em"}}>{speaker.title}</Typography>
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          }
        </Grid>
      </Grid>
      <Grid xs={12} className={styles.bannerGreen}>
        <Grid container spacing={0} className={styles.container}>
          <Grid xs={12}>
            <Typography className={`${styles.whiteText} ${styles.text700} ${styles.text2Xl}`}>One time offer only!</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{paddingBottom: "2em"}}>
        <Grid container spacing={0} className={`${styles.container} ${styles.centerText}`} justify={'center'}>
          <Grid item xs={12} style={{paddingBottom: "1em"}}>
            <Typography className={`${styles.textMd}`}>Click the green button below and this premium collection will be yours, instantly.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button className={props.classes.button + ' ' + styles.upsellButton} style={{
              width: '100%',
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '16px'
            }} color={'primary'} variant={'raised'} onClick={props.handleClickUpsell}>Yes, add this collection to my order for only ${props.amount}
            </Button>
          </Grid>
          <Grid item xs={12} style={{paddingBottom: "1em"}}>
            <Grid container spacing={0} className={`${styles.container} ${styles.centerText}`}>
              <Grid item xs={3} />
              <Grid item xs={6} >
                <Button className={`${props.classes.button} ${styles.upsellButton} ${styles.upsellButtonDecline} ${styles.bgMedGrey}`} style={{width: '100%'}} variant={'raised'} onClick={props.handleDeclineUpsell}>No, thanks.
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={`${styles.textSm}`}>Clicking "Yes" above will add The Ultimate Health Collection to your purchase now, for an additional ${props.amount}. Your purchase comes with a total 60-day, money-back guarantee.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={styles.footer} xs={12}>
        <div className={styles.container}>
          <Grid container spacing={0} justify={'left'} direction={'column'}>
            <Grid item xs={12}>
              <Typography className={styles.footerPaddingTop}>
                <p className={styles.footerText}>&copy; 2018 - Food Revolution Network
                  <span className={styles.footerLinks}>
                    <a className={styles.footerText} href='https://foodrevolution.org/faq'>FAQs</a>
                    <a className={styles.footerText} href='https://foodrevolution.org/terms-and-conditions'>Terms & Conditions</a>
                    <a className={styles.footerText} href='https://foodrevolution.org/policy'>Privacy Policy</a>
                  </span>
                </p>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
};
