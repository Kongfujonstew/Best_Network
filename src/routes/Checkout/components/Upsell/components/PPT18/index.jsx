/* eslint-disable */
import React, {PureComponent} from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import List, {ListItem} from 'material-ui/List';
import CheckCircleShadow from 'images/SVG/CheckCircleShadow';
import Calendar from 'images/SVG/Calendar';
import HeartBeat from 'images/SVG/HeartBeat';
import styles from '../styles.scss';
const contentUrl = process.env.USER_CONTENT_URL;

export default(props) => {
  const {
    banner,
    bannerHeader,
    container,
    textBase,
    textSm,
    textMd,
    textLg,
    textXl,
    text2Xl,
    text700,
    greyText,
    whiteText,
    centerBlock,
    centerText,
    greenText,
    title,
    listIntro,
    listStyles,
    check,
    textStyles,
    miniBanner,
    miniBannerText,
    bgLightGrey,
    bgDarkGrey,
    bgLightGreen,
    bgGrey,
    bgInk,
    inAWorld,
    inAWorldItem,
    imgResponsive,
    one,
    bonusStyles,
    bonusTitle,
    sectionHeader
  } = styles;

  const list = [
    () => <p className={textStyles}>Food cravings</p>,
    () => <p className={textStyles}>Finding time to make healthy meals & snacks</p>,
    () => <p className={textStyles}>Feeling like you have to compromise pleasure to eat healthfully</p>,
    () => <p className={textStyles}>The rising cost of natural foods</p>,
    () => <p className={textStyles}>Feeling isolated or unsupported in your healthy food life</p>,
    () => <p className={textStyles}>Confusion about the best way to get all the nutrients you need to fight off disease, lose weight and gain more energy...</p>,
    () => <p className={textStyles}>And other healthy eating challenges…</p>
  ];

  const factsList = ['The truth about soy', 'The pros and cons of juicing and blending', 'How to get kids of all ages to eat and love healthy, plant-powered foods', `Info on the “dirty dozen”`];

  const bonuses = [
    {
      title: 'Dr. Fuhrman’s G-BOMB eBook',
      description: 'A handy ebook, filled with information and recipes on G-BOMBS: Greens, Beans, Onions, Mushrooms, Berries, and Seeds, the best anti-cancer, health-promoting foods on the planet.',
      img: `${contentUrl}assets/images/ppt18-gbombs-bonus.jpg`
    }, {
      title: 'Cancer Healing Special Report by Caryn Hartglass',
      description: 'Caryn Hartglass shows how you can align your body, mind, and environment to prevent or reverse cancer through food and lifestyle changes. Recipes included.',
      img: `${contentUrl}assets/images/ppt18-bonus_health_cancer.png`
    }, {
      title: 'Eat Your Way Out of Pain Home Study Program',
      description: 'This program includes audio, video, e-books, recipes and checklists... everything you need to start managing your pain and inflammation through food...without drugs or surgery!',
      img: 'https://thriving.foodrevolution.org/assets/images/eat-your-way.png'
    }, {
      title: 'The Dairy Freedom Cookbook',
      description: `With this collection of 30 deliciously dairy-free recipes, you'll learn how to whip up your own nut milk, better butter, moo-free cheese, and beyond.`,
      img: 'https://thriving.foodrevolution.org/assets/images/bonus-dairy-freedom-cookbook-3d.png'
    },  {
      title: 'The Food Revolution Network Family Cookbook',
      description: '100+ delicious, nutritious, plant-strong recipes from the Robbins family, Food Revolution Summit speakers, and Food Revolution Network friends, family, and community.',
      img: `${contentUrl}assets/images/frn-family-cookbook.png`
    }
  ];

  const orderButtons = (
    <Grid item xs={12} style={{paddingBottom: "2em"}}>
      <Grid container spacing={0} className={`${styles.container} ${centerText}`} justify={'center'}>
        <Grid item xs={12} style={{paddingBottom: "1em"}}>
          <Typography className={`${textLg}`}><span className={`${styles.textStrike}`}>Regular Price: $297</span></Typography>
        </Grid>
        <Grid item xs={12} style={{paddingBottom: "1em"}}>
          <Typography className={`${textMd}`}>Click the green button below and this premium course will be yours, instantly.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button className={props.classes.button + ' ' + styles.upsellButton} style={{
            width: '75%',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '16px'
          }} color={'primary'} variant={'raised'} onClick={props.handleClickUpsell}>Yes, add this course to my order for only ${props.amount}
          </Button>
        </Grid>
        <Grid item xs={12} style={{paddingBottom: "1em"}}>
          <Grid container spacing={0} className={`${styles.container} ${centerText}`}>
            <Grid item xs={12}>
              <Button className={`${props.classes.button} ${styles.upsellButton} ${styles.upsellButtonDecline} ${styles.bgMedGrey}`} style={{width: '40%'}} variant={'raised'} onClick={props.handleDeclineUpsell}>No, thanks.
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography className={`${textSm}`} style={{paddingLeft: "12.5%", paddingRight: "12.5%"}}>Clicking "Yes" will add Plant-Powered and Thriving to your purchase for an additional ${props.amount}. Your purchase comes with a total 60-day, money-back guarantee.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Grid container spacing={0} justify={'center'}>
      <Grid item xs={12} className={`${styles.banner} ${styles.bannerHeader}`}>
        <Grid container spacing={0} className={styles.container}>
          <Grid item xs={12}>
            <Typography className={`${text700} ${text2Xl} ${whiteText} ${styles.textUppercase}`}>
              Congratulations on Your Purchase!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={`${textMd} ${whiteText}`} style={{marginTop: "1em"}}>
              Here's one more opportunity for you to consider because it solves the #1 problem that we find our summit graduates face.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={styles.fixedBackground} style={{paddingTop: "50px", paddingBottom: "50px"}}>
        <div className={styles.videoContainer + " " + styles.container}>
          <div className={styles.videoContainerInner}>
            <iframe className={styles.video} src="https://www.youtube.com/embed/dZOQSlot0HU?wmode=opaque&showinfo=0&autoplay=1&controls=1&modestbranding=1&vq=&rel=0&playsinline=1"frameBorder="0" width="640" height="480" allowFullScreen></iframe>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} className={`${styles.sectionLifeEasier}`} style={{paddingTop: "2em", paddingBottom: "2em"}}>
        <Grid container spacing={0} className={styles.container} style={{paddingTop: "2em", paddingBottom: "2em"}}>
          <Grid item xs={12}>
            <Typography className={`${whiteText} ${textMd} ${centerText}`} style={{paddingBottom: "1.5em"}}>
              This is the 7th year we’ve held the Food Revolution Summit. You’re going to love it! And you might also find that you want some support implementing all that you learn.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={`${whiteText} ${text700} ${textLg} ${centerText}`}>
                That’s why we created our Plant-Powered and Thriving course. To help people like you take action on all the incredible life-changing knowledge shared during the Summit.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{marginTop: "3em"}}>
        <Grid container spacing={0} className={`${styles.container} ${styles.centerText}`}>
          <Grid item xs={12}>
            <Typography className={`${styles.textXl}`}>
              If you struggle with:
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} className={listStyles}>
        {list.map((listItem, i) => {
          const hackyIndex = i + 100;
          return (
            <Grid key={hackyIndex} container spacing={0} justify="center" style={{
              alignItems: 'center',
              backgroundColor: hackyIndex % 2 === 0
                ? '#fff'
                : '#f4fbf3',
              minHeight: '150px'
            }}>
              <Grid item xs={12}>
                <Grid container spacing={0} justify="center" className={styles.container}>
                  <Grid item xs={12} sm={2} className={styles.checkContainer}>
                    <CheckCircleShadow className={styles.check} color="primary"/>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography className={`${textMd}`}>
                      {listItem()}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        })}
        <Grid container spacing={0} justify="center" style={{marginBottom: "2em"}}>
          <Grid item xs={12}>
            <Grid container spacing={0} justify="center" className={styles.container}>
              <Grid item xs={12}>
                <Typography className={`${textXl} ${centerText} ${text700} ${styles.textItalic}`}>
                  This course is for you!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} className={`${bgLightGreen}`} style={{paddingTop: "40px", paddingBottom: "40px"}}>
        <Grid container spacing={0} justify="center" className={styles.container}>
          <Grid item xs={12} className={`${centerText}`} style={{marginBottom: "20px"}}>
            <Typography className={`${styles.text3Xl} ${styles.orangeText} ${text700}`}>Plant-Powered and Thriving</Typography>
          </Grid>
          <Grid container spacing={40}>
            <Grid item xs={12} sm={6} style={{display: "flex"}}>
              <Grid container spacing={16} justify="center" className={`${styles.courseContainer}`}>
                <Grid item xs={3}><Calendar className={styles.check} fill="#279C17" style={{width: "95%"}}/></Grid>
                <Grid item xs={9}>
                  <Typography className={`${styles.textXl} ${styles.text700}`}>The course</Typography>
                  <Typography className={`${styles.textLg} ${styles.text700}`}>June 5 - July 10, 2018</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} style={{display: "flex"}}>
              <Grid container spacing={16} justify="center" className={`${styles.courseContainer}`}>
                <Grid item xs={3}><HeartBeat className={styles.check} fill="#279C17" style={{width: "95%"}}/></Grid>
                <Grid item xs={9}>
                  <Typography className={`${styles.textXl} ${styles.text700}`}>The Impact</Typography>
                  <Typography>Your body will thank you for the rest of your life!</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={11}>
            <Grid container spacing={16} style={{marginTop: "30px"}}>
              <Grid item md={2} hidden={{smDown: true}}>
                <img src="https://thriving.foodrevolution.org/assets/images/john-ocean-caryn-circle-large.png" style={{width: "95%"}}/>
              </Grid>
              <Grid item xs={12} md={10} className={`${styles.courseContentFooter}`}>
                <Typography className={`${styles.textXl} ${styles.text700}`}>With John & Ocean Robbins plus Special Guest, Caryn Hartglass</Typography>
                <Typography className={`${styles.textMd}`} style={{marginTop: "0.5em"}}>Take the stress out of healthy eating &ndash; and make it easy, affordable, and DELICIOUS...</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} className={`${sectionHeader} ${bgDarkGrey}`}>
        <Grid container spacing={0} justify="center" className={styles.container}>
          <Grid item xs={12} className={`${centerText}`}>
            <Typography className={`${styles.textXl} ${whiteText}`} style={{marginBottom: "0.5em"}}>After the Summit’s over, you’ll be ready to take the next step:</Typography>
            <Typography className={`${styles.text2Xl} ${whiteText} ${text700}`}>Put it all into ACTION!</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{paddingBottom: "2em"}}>
        <Grid container spacing={0} justify="center" className={styles.container}>
          <Grid item xs={12} className={`${centerText}`}>
            <Typography className={`${styles.text3Xl} ${greenText}`} style={{marginBottom: "0.50em"}}>
              In a world where <span className={text700}>toxic food</span> is all around us...
            </Typography>
          </Grid>
          <Grid item xs={12} className={`${centerText}`} style={{marginBottom: "1.75em"}}>
            <Typography className={textXl}>
              Where conflicting advice abounds, and it seems like you <strong>don’t have enough time in the day...</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} className={`${centerText}`} style={{marginBottom: "1.75em"}}>
            <Typography className={`${textXl} ${styles.textItalic}`}>
              Eating for <strong>excellence</strong> and eating to avoid disease can be <span className={styles.textUnderline}>hard</span>.
            </Typography>
          </Grid>
          <Grid item xs={12} className={`${centerText}`} style={{marginBottom: "2em"}}>
            <Typography className={textMd}>
              Let us give you the shortcuts you need to SAVE TIME AND MONEY while putting the skills and knowledge you learned during the Food Revolution Summit to use.
            </Typography>
          </Grid>
          <Grid item xs={12} className={`${centerText}`} style={{marginBottom: "2em"}}>
            <Typography className={textMd}>
              Are you ready to experience healthy eating mastery?
            </Typography>
          </Grid>
          <Grid item xs={12} className={`${centerText}`}>
            <Typography className={textMd}>
              We’re offering this course at a special, one-time-only super early-bird price ONLY for Empowerment Package customers, which will disappear if you close this page.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={styles.banner}>
        <Grid container spacing={0} justify="center" className={styles.container}>
          <Grid item xs={12}>
            <Typography align="center" className={`${whiteText} ${text700} ${text2Xl}`}>
              One Time Offer Only!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {orderButtons}

      <Grid item xs={12} className={`${bgDarkGrey} ${sectionHeader}`}>
        <Typography className={`${whiteText} ${textXl} ${styles.textCapitalize} ${text700}`}>
          Here's what you'll receive
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={12} style={{paddingTop: "2em", paddingBottom: "2em"}}>
            <Grid container spacing={0} className={styles.container} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography className={`${text700} ${textXl}`}>6 Hour&ndash;long Classes</Typography>
                <Typography className={`${textLg}`}>with John and Ocean Robbins plus special guest Caryn Hartglass</Typography>
                <Typography className={`${textSm}`} style={{marginBottom: '1.75em', marginTop: '0.5em'}}>(Audio with slides and transcripts)</Typography>
                <Typography className={`${textMd}`}>
                  Course sessions will be held on Tuesday evenings, June 5 - July 10, 2018, at 5:30 pm Pacific Time / 8:30 pm Eastern Time, with replays and written transcripts available afterward so you can participate any time you want — for life!
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img src={'https://thriving.foodrevolution.org/assets/images/john-ocean-caryn-circle-large.png'} className={`${centerBlock} ${imgResponsive}`} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={bgLightGreen} style={{paddingTop: "2em", paddingBottom: "2em"}}>
            <Grid container spacing={0} className={styles.container} alignItems="center">
              <Grid item xs={12} sm={6}>
                <img src={'https://thriving.foodrevolution.org/assets/images/logo-exclusive.png'} className={`${centerBlock} ${imgResponsive}`} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className={textXl} style={{marginBottom: '1em'}}>Access to Our <span className={text700}>Exclusive and Moderated Online Community</span></Typography>
                <Typography className={`${textMd}`}>
                  Share your successes and insights, offer and receive support, exchange and give feedback on favorite recipes, and connect with like-minded individuals in our exclusive Facebook group.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{paddingTop: "2em", paddingBottom: "2em"}}>
            <Grid container spacing={0} className={styles.container} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography className={`${text700} ${textXl}`} style={{marginBottom: '1em'}}>Mouthwatering, Easy-To-Prepare Recipes</Typography>
                <Typography className={`${textMd}`}>
                  The basic recipe collection is 100% plant-based and non-GMO with gluten-free and soy-free options that are super easy to implement.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img src={'https://thriving.foodrevolution.org/assets/images/recipes-veg.png'} className={`${centerBlock} ${imgResponsive}`} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={bgLightGreen} style={{paddingTop: "2em", paddingBottom: "2em"}}>
            <Grid container spacing={0} className={styles.container} alignItems="center">
              <Grid item xs={12} sm={6}>
                <img src={'https://thriving.foodrevolution.org/assets/images/healthy-kids-special-report.png'} className={`${centerBlock} ${imgResponsive}`} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className={`${text700} ${textXl}`} style={{marginBottom: '1em'}}>Fact Sheets and Special Reports</Typography>
                <Typography className={`${textMd}`}>You'll get to learn:</Typography>
                  <List>
                    {factsList.map((fact, i) => {
                      const hackyIndex = i + 100;
                      return (
                        <ListItem key={hackyIndex}>
                          <CheckCircleShadow className={check} color="primary" style={{position: "absolute"}}/><Typography style={{paddingLeft: "40px"}}>{fact}</Typography>
                        </ListItem>
                      )
                    })
  }
                  </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={`${styles.communityContainer}`}>
        <Grid container spacing={0} className={styles.container}>
          <Grid item xs={12} className={`${styles.communityContainerInner}`}>
            <Typography className={`${styles.communityText} ${textXl} ${text700}`}>This is More Than A Course <br />— It’s A Community!</Typography>
            <Typography className={`${styles.communityText}`} style={{marginTop: "1.5em"}}>You need MORE than the right knowledge to make the right choices.</Typography>
            <Typography className={`${styles.communityText}`} style={{marginTop: "1.5em"}}><span className={`${text700}`}>You need friends and community</span> to pick you up when times get tough, to troubleshoot with you when things don’t make sense, and to give you ongoing support and rich peer-to-peer connection.</Typography>
            <Typography className={`${styles.communityText}`} style={{marginTop: "1.5em"}}><span className={`${text700}`}>When you register</span> for Plant-Powered and Thriving, you’ll become part of a vibrant, uplifting community that will help you along the way.</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={styles.banner}>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} className={`${styles.container} ${centerText}`}>
            <Typography className={`${text2Xl} ${whiteText} ${text700}`}>One Time Offer Only!</Typography>
          </Grid>
        </Grid>
      </Grid>

      {orderButtons}

      <Grid item xs={12} className={`${sectionHeader} ${bgDarkGrey}`}>
        <Grid container spacing={0} justify="center" className={`${styles.container}`}>
          <Grid item xs={12} className={`${centerText}`}>
            <Typography className={`${textXl} ${whiteText} ${text700}`}>Powerful Bonuses</Typography>
            <Grid container spacing={0} justify="center" style={{marginTop: "1em"}}>
              <Grid item xs={12} md={11} className={`${centerText}`}>
                <Typography className={`${textMd} ${whiteText}`} >When you sign up for Plant-Powered and Thriving, you’ll also gain access to a powerful collection of free bonuses from our friends and partners!</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} className={`${styles.container} ${centerText}`}>
          <Typography className={`${textXl} ${styles.greenText} ${text700}`} style={{marginBottom: "1em"}}>Plus This Fast Action Bonus – <hidden mdDown><br /></hidden>only available when you register today.</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12} style={{paddingTop: "2em", paddingBottom: "2em"}}>
          <Grid container spacing={0} className={styles.container}>
            <Grid item xs={12} sm={6}>
              <Typography className={`${text700} ${text2Xl}`}>FAST ACTION BONUS</Typography>
              <Typography className={`${textLg} ${text700}`} style={{marginBottom: '1em'}}>The Food Revolution Ultimate Health Collection</Typography>
              <Typography className={`${textMd}`}>A collection of 20 curated, food and health-themed interviews from our previous six Summits to give you expert advice and tips for improving your health.</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={`${contentUrl}assets/images/uhc2018.png`} className={`${centerBlock} ${imgResponsive} ${styles.bonusImage}`}/>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={0}>
            {bonuses.map((bonus, i) => {
              const hackyIndex = i + 100;
              const isEven = hackyIndex % 2 === 0;
              const bonusText = (
                <Grid item xs={12} sm={6}>
                  <Typography className={`${text700} ${text2Xl}`}>Bonus #{i+1}</Typography>
                  <Typography className={`${textLg} ${text700}`} style={{marginBottom: '1em'}}>{bonus.title}</Typography>
                  <Typography className={`${textMd}`}>{bonus.description}</Typography>
                </Grid>
              );
              const bonusImage = (
                <Grid item xs={12} sm={6}>
                  <img src={bonus.img} className={`${centerBlock} ${imgResponsive} ${styles.bonusImage}`}/>
                </Grid>
              );
              return (

                <Grid item xs={12} style={{paddingTop: "2em", paddingBottom: "2em"}} className={isEven ? bgLightGreen : ''}>
                  <Grid container spacing={0} className={styles.container}>
                    {isEven ? bonusImage : bonusText}
                    {isEven ? bonusText : bonusImage}
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} className={`${sectionHeader} ${bgDarkGrey} ${styles.marginBottom0}`}>
        <Grid container spacing={0} className={styles.container}>
          <Grid item xs={12}>
            <Typography className={`${textXl} ${centerText} ${whiteText} ${text700}`}>JOIN John, Ocean, Caryn, and This Powerful Community to Take Your Healthy Eating to the Next Level</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} className={styles.banner}>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} className={`${styles.container} ${centerText}`}>
            <Typography align="center" className={`${whiteText} ${text700} ${text2Xl}`}>
              One Time Offer Only!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {orderButtons}

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
