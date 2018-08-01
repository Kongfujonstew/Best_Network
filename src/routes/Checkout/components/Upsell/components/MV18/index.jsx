import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import CategoryList from './CategoryList';

import styles from './styles.scss';
import {
  categoryOne,
  categoryTwo,
  categoryThree,
  categoryFour,
  categoryFive
} from './data';

const contentUrl = process.env.USER_CONTENT_URL;
const {
  bannerRed,
  button,
  buttonContainerMaxWidth,
  container,
  crossOut,
  floatingArrow,
  footer,
  footerLinks,
  footerPaddingTop,
  footerText,
  frnDarkGreyText,
  frnDarkGreenText,
  greenDashedBox,
  header,
  lightGreenText,
  orderButtonS,
  pptLogo,
  relativeDisplay,
  text700,
  textButton,
  textXl,
  textM,
  textS,
  textXs,
  vaultContainerMaxWidth,
  video,
  videoContainer,
  videoContainerInner,
  whiteDashedBox,
  whiteText
} = styles;

const MV18 = (props) => {
  const orderButtons = (isGreen) => {
    const {
      amount, interval, numInstallments, paymentDescription
    } = props;
    const amountInt = amount.slice(0, -3);

    // change me
    const background = isGreen ?
      'url(https://checkout.foodrevolution.org/wp-content/uploads/2016/08/bg-curly-abstract-green.jpg)' :
      'url(https://checkout.foodrevolution.org/wp-content/uploads/bg-paisley-trans-medium.png';

    const floatingArrowBackground = isGreen ?
      'url(https://checkout.foodrevolution.org/wp-content/uploads/2016/08/btn-arrow.png)' :
      'url(https://checkout.foodrevolution.org/wp-content/uploads/btn-arrow-green.png)';

    const border = isGreen ? whiteDashedBox : greenDashedBox;
    const greyOrLightGreenText = isGreen ? lightGreenText : frnDarkGreyText;
    const darkGreenOrWhiteText = isGreen ? whiteText : frnDarkGreenText;
    const whiteOrGreyText = isGreen ? whiteText : frnDarkGreyText;

    const abbrvPaymentsDescription =
      numInstallments > 1 ?
        `${numInstallments} payments of` :
        '';

    const paymentPlanDescription =
      numInstallments > 1 ?
        `, on the same ${interval} payment plan as your original order. You’ll be charged an additional $${amount} today, and $${amount} each of the next ${numInstallments} ${interval}s` :
        `. You’ll be charged an additional $${amount} today`;


    return (
      <Grid item xs={12} style={{ padding: '1em 0 2em 0', background, overflow: 'hidden' }}>
        <Grid container justify="center">
          <Grid item className={`${greenBackground}`} style={{ fontWeight: '500' }}>
            <Grid container spacing={0} justify="center">
              <Grid item className={`${border} ${buttonContainerMaxWidth}`}>
                <Typography style={{ textAlign: 'center', paddingBottom: '16px' }} className={`${orderButtonS} ${text700} ${greyOrLightGreenText}`}>
                  Claim unlimited lifetime access to
                </Typography>

                <Typography
                  style={{ textAlign: 'center', paddingBottom: '16px' }}
                  className={`${text700} ${textXl} ${darkGreenOrWhiteText}`}
                >
                  "The Food Revolution Master's Vault"
                </Typography>

                {/* <Typography style={{ textAlign: 'center' }} className={`${text700} ${orderButtonS} ${greyOrLightGreenText}`}>
                  <span className={darkGreenOrWhiteText}>{paymentDescription.slice(23).slice(0, -1)}</span>
                </Typography> */}

                <Typography style={{ textAlign: 'center' }} className={`${text700} ${orderButtonS} ${greyOrLightGreenText}`}>
                  for only <span className={crossOut}>$1,182</span>{' '}<span className={darkGreenOrWhiteText}>{`${abbrvPaymentsDescription} $${amountInt}`}!</span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={0} justify="center">
          <Grid item style={{ paddingBottom: '1.5em', textAlign: 'center' }}>
            <Typography className={`${whiteOrGreyText} ${textM} ${buttonContainerMaxWidth}`}>This is the complete collection of Food Revolution Summit and GMO Summit interviews from 2012 through 2018, each of which are available individually, on our website for $197. The Master’s Vault offer is not available as a package on our website and is exclusively available when purchased with Plant-Powered and Thriving.</Typography>
            <div className={relativeDisplay} style={{ width: '100%' }}>
              <div
                style={{ backgroundImage: floatingArrowBackground }}
                className={floatingArrow}
              />
            </div>
          </Grid>
          <Grid item xs={9} style={{ paddingBottom: '1em' }}>
            <Grid container justify="center">
              <Button
                className={`${button}`}
                color="secondary"
                variant="raised"
                onClick={props.handleClickUpsell}
              >{`Add this to your order for ${abbrvPaymentsDescription} $${amountInt}`}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={10} style={{ paddingBottom: '1.5em' }}>
            <Grid container justify="center">
              <Typography
                className={`${darkGreenOrWhiteText} ${textButton} ${buttonContainerMaxWidth}`}
                onClick={props.handleDeclineUpsell}
              >No, thank you. Please don't add this to my order
              </Typography>
            </Grid>
          </Grid>
          <Grid item style={{ paddingBottom: '16px', textAlign: 'center' }}>
            <Typography className={`${whiteOrGreyText} ${textXs} ${buttonContainerMaxWidth}`}>Please click one of the buttons above. Clicking the orange button will add The Food Revolution Master’s Vault to your purchase{paymentPlanDescription}. You’ll own the Master’s Vault for life, and your purchase comes with a total 60 day money-back guarantee.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  // change me
  const greenBackground = 'url(https://checkout.foodrevolution.org/wp-content/uploads/2016/08/bg-curly-abstract-green.jpg)';

  return (
    <Grid container spacing={0} justify="center">
      <div className={header}>
        {/* change me to: `${contentUrl}assets/images/...` */}
        <img className={pptLogo} src="https://checkout.foodrevolution.org/wp-content/uploads/ppt17-pagelogo-20171030-1200.png" className="full-width" />
      </div>
      <Grid item xs={12} style={{ marginBottom: '16px' }}>
        <Grid container spacing={0} className={`${bannerRed}`} justify="center">
          <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '4px' }}>
            <Grid container justify="center">
              <Typography className={`${text700} ${whiteText} ${textXl} ${vaultContainerMaxWidth}`}>
                CONGRATULATIONS ON YOUR PURCHASE
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: '16px', textAlign: 'center', maxWidth: '92vw' }}>
            <Typography className={`${textS} ${whiteText} ${vaultContainerMaxWidth}`}>
              Here's one more special opportunity for you to consider...
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ textAlign: 'center', margin: '16px 0', maxWidth: '92vw' }}>
        <Typography style={{ textAlign: 'center' }} className={`${text700} ${textXl} ${frnDarkGreenText} ${vaultContainerMaxWidth}`}>
          "Listen and Learn as 80 of the World's Top Food Experts Share Their Best Tips, Tricks and Strategies For Creating a Healthy, Enlightened, Youthful and Sexy Mind & Body"...
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div style={{ padding: '16px 12px 40px 12px', maxWidth: '720px' }} className={videoContainer}>
          <div className={videoContainerInner}>
            <iframe className={video} frameBorder={0} src="https://www.youtube.com/embed/5TETt24fsrg?ecver=2?wmode=opaque&showinfo=0&autoplay=1&modestbranding=1&vq=&rel=0&enablejsapi=1" width="640" height="480" allowFullScreen />
          </div>
        </div>
      </Grid>

      { orderButtons(true) }

      <Grid container justify="center">
        <Grid item xs={12} style={{ textAlign: 'center', margin: '32px 0' }}>
          <Typography style={{ margin: 'auto', fontWeight: '500' }} className={`${frnDarkGreenText} ${textXl} ${vaultContainerMaxWidth}`}>
            You’ll get over 100+ interviews that are instantly accessible (downloadable mp3 recordings and full transcripts) in five different categories, including:
          </Typography>
        </Grid>
      </Grid>


      <CategoryList category={categoryOne} />
      <CategoryList category={categoryTwo} />
      <CategoryList category={categoryThree} />
      <CategoryList category={categoryFour} />
      <CategoryList category={categoryFive} />


      <Grid item xs={12}>
        <Grid container spacing={0} className={`${bannerRed}`} justify="center">
          <Grid item style={{ textAlign: 'left', maxWidth: '92vw' }}>
            <Typography style={{ marginLeft: '16px' }} className={`${whiteText} ${textXl} ${vaultContainerMaxWidth}`}>
              Listen to all of the expert interviews, and enjoy maximum healing and optimal wellness. Share your newly gained wisdom and knowledge with all those you love and care about… helping them to enjoy better health too!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ padding: '16px 16px 32px 0', margin: 'auto' }}>
        <Grid container spacing={0} justify="center" style={{ margin: 'auto' }} className={vaultContainerMaxWidth}>
          <Grid item sm={4}>
            <Hidden smDown>
              <Grid container spacing={0} justify="center">
                <div style={{ width: '100%', padding: '16px', textAlign: 'center' }}>
                  {/* change me to: `${contentUrl}assets/images/...` */}
                  <img
                    style={{ width: '100%', maxWidth: '400px' }}
                    alt="60 Day Guarantee"
                    src="https://checkout.foodrevolution.org/wp-content/uploads/2016/08/60day-moneyback.png"
                    border="0"
                  />
                </div>
              </Grid>
            </Hidden>
          </Grid>
          <Grid item xs={12} md={8} style={{ padding: '16px' }}>
            <Typography style={{ paddingBottom: '16px' }} className={`${textS} ${frnDarkGreyText}`}>
              And to put your mind at ease, and give you every possible reasonto say yes to this one-time offer today… you’ll also get our
            </Typography>
            <Typography style={{ paddingBottom: '16px' }} className={`${text700} ${textXl} ${frnDarkGreenText}`}>
              “60-Day, 100% Better-Than-Money-Back-Guarantee”!
            </Typography>
            <Typography className={`${textS} ${frnDarkGreyText}`}>
              Go ahead and take the next 60 days to decide if this course is right for you. If you aren’t completely 100% thrilled with what you get from this course, we don’t want to keep your money. Just shoot us an email or give us a quick phone call, and you’ll promptly get a full refund, no questions asked. And as our way of saying “thank you” for trying it out, you can go ahead and keep any bonuses or resources that you’ve downloaded.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={0} justify="center">
        <Grid
          item
          style={{
 margin: 'auto', padding: '30px 0', textAlign: 'center', width: '100%', background: greenBackground
}}
        >
          <Typography style={{ margin: 'auto' }} className={`${whiteText} ${textXl} ${vaultContainerMaxWidth}`}>
            Get access to the complete Master's Vault collection with 130 interviews — instant downloads, streaming audio, and beautifully formatted full transcripts — to learn from the foremost authorities on food and healing as they share their insights on the latest breakthroughs in science and wellbeing and how to apply them in YOUR life.
          </Typography>
        </Grid>
      </Grid>

      { orderButtons(false) }

      <Grid item className={footer} style={{ background: greenBackground, padding: '20px 0' }} xs={12}>
        <div className={container}>
          <Grid container spacing={0} justify="left" direction="column">
            <Grid item xs={12}>
              <Typography className={footerPaddingTop}>
                <p className={footerText}>&copy; 2018 - Food Revolution Network
                  <span className={footerLinks}>
                    <a className={footerText} href="https://foodrevolution.org/faq">FAQs</a>
                    <a className={footerText} href="https://foodrevolution.org/terms-and-conditions">Terms & Conditions</a>
                    <a className={footerText} href="https://foodrevolution.org/policy">Privacy Policy</a>
                  </span>
                </p>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

MV18.propTypes = {
  amount: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired,
  numInstallments: PropTypes.number.isRequired,
  paymentDescription: PropTypes.string.isRequired
};

export default MV18;
