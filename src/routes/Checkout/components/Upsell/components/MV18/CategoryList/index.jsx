import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import styles from './styles.scss';

const CategoryList = ({
  category: {
    backgroundImageUrl,
    backgroundPosition,
    categoryTitle,
    dynamicMargin,
    description,
    floatingImageUrl,
    interviews,
    options
  }
}) => {
  const {
    categoryText,
    dynamicMarginLeft,
    dynamicGreenBackground,
    floatingVeggies,
    frnDarkGreyText,
    frnDarkGreenText,
    fullWidthGreenBackground,
    greenAuthorColor,
    interviewWidthResponsive,
    lightGreenText,
    opaqueBackground,
    redTitle,
    relativeDisplay,
    text700,
    textMd,
    textXl,
    vaultContainerMaxWidth,
    whiteTitle
  } = styles;

  let categoryTitleColor = options.redTitle ? redTitle : frnDarkGreenText;
  if (options.greenBackground) {
    categoryTitleColor = whiteTitle;
  }

  let margin;

  if (dynamicMargin === 'left') {
    margin = dynamicMarginLeft;
  }

  // change me to use contentUrl
  const backgroundImage = `url(${backgroundImageUrl})`;
  const descriptionColor = options.greenBackground ? lightGreenText : frnDarkGreyText;
  const floatingImageBackground = floatingImageUrl ? `url(${floatingImageUrl})` : null;

  return (
    <Grid
      item
      xs={12}
      style={{
 padding: '32px 0',
        backgroundImage,
        backgroundPosition,
        backgroundSize: 'cover',
        overflow: 'hidden'
      }}
    >
      <Grid container spacing={0} direction="column" className={margin} justify="center">
        <div style={{ margin: 'auto' }} className={vaultContainerMaxWidth}>
          <Grid item xs={12} style={{ paddingBottom: '16px' }}>
            <Typography style={{ marginLeft: '24px' }} className={`${categoryTitleColor} ${textXl} ${text700}`}>
              { categoryTitle }
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ paddingBottom: '24px' }}>
            <Typography style={{ marginLeft: '24px' }} className={`${categoryText} ${descriptionColor}`}>
              { description }
            </Typography>
          </Grid>
        </div>
      </Grid>
      { floatingImageUrl ?
        <div className={relativeDisplay}>
          <div
            style={{ backgroundImage: floatingImageBackground }}
            className={floatingVeggies}
          />
        </div> : null
      }
      <Grid container spacing={0} direction="column" className={margin}>
        { interviews.map((props, index) => {
          const { author, title } = props;

          let authorColor = frnDarkGreyText;
          let titleColor = frnDarkGreyText;
          let background;
          if (index % 2 === 0) {
            background = options.greenBackground ?
              opaqueBackground :
              dynamicGreenBackground;

            if (categoryTitle === 'The Science of Healing with Food') {
              background = fullWidthGreenBackground;
            }
          }

          let limitWidth = null;
          if (!options.greenBackground && categoryTitle !== 'The Science of Healing with Food') {
            limitWidth = interviewWidthResponsive;
          }

          if (options.greenBackground) {
            authorColor = greenAuthorColor;
            titleColor = lightGreenText;
          }

          return (
            <Grid style={{ padding: '16px 0' }} className={background}>
              <div style={{ margin: 'auto' }} className={`${vaultContainerMaxWidth}`}>
                <Typography style={{ marginLeft: '32px' }} className={`${limitWidth} ${categoryText}`}>
                  <span style={{ fontWeight: '500' }} className={`${authorColor}`}>{author}</span>
                  {' '}
                  <span style={{ fontWeight: '400' }} className={`${titleColor}`}>{title}</span>
                </Typography>
              </div>
            </Grid>
          );
        })}
      </Grid>
      <Grid container spacing={0} direction="column" className={margin}>
        <Grid item xs={12} style={{ padding: '16px 0' }}>
          <div style={{ margin: 'auto' }} className={vaultContainerMaxWidth}>
            <Grid container spacing={0} justify="flex-start">
              <Typography style={{ width: '100%', marginLeft: '32px' }} className={`${categoryText} ${descriptionColor}`}>
                And MUCH more!
              </Typography>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

CategoryList.propTypes = {
  category: PropTypes.shape({
    categoryTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    interviews: PropTypes.shape({}).isRequired,
    options: PropTypes.shape({}).isRequired
  }).isRequired
};

export default CategoryList;
