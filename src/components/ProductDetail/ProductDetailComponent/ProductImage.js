import React from 'react'
import { makeStyles } from '@mui/styles'
import { Card, CardActionArea, CardMedia, Grid, Hidden, Skeleton } from '@mui/material'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  ProductContainer: {
    padding: "0 44px",
    fontSize: 16,
    lineHeight: 1.7
  },
  ProductImage: {
    width: "100%"
  },
  image: {
    maxHeight: "100%",
    maxWidth: "100%"
  }
}))
const ProductImage = ({ detailProduct, index }) => {
  const classes = useStyles()
  const setting = {
    dots: false,
    Infinity: false,
    autoplay: false,
    slidesToScroll: 1,
    slidesToShow: 1
  }
  const isLoading = useSelector((state) => state.reducerURL.isLoading)
  const listLazyLoad = [];
  for (let i = 0; i < 6; i++) {
    listLazyLoad.push(
      <Grid item xs={6} key={i} >
        <Skeleton >
          <img src="https://static.nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/d6f66b63-127f-4856-a4ed-2fc54f2aa4d6/jordan-adg-2-golf-shoe-rjHVg9.jpg" />
        </Skeleton>
      </Grid>
    )
  }
  return (
    <div>
      <Hidden smDown>
        {isLoading ?
          <Grid container className={classes.ProductContainer} spacing={2}>
            {listLazyLoad}
          </Grid>
          :
          <Grid container className={classes.ProductContainer} spacing={2}>
            {detailProduct.imgDetails[index].imgs.map((item, i) => {
              return (
                <Grid item xs={6} key={i}>
                  <img src={item.img} className={classes.ProductImage} />
                </Grid>
              )
            })}
          </Grid>
        }
      </Hidden>
      <Hidden mdUp >
        <Container maxWidth="xl" >
          <Slider {...setting}>
            {detailProduct.imgDetails[index].imgs.map((item, key) => {
              return (
                <Card className={classes.image} key={key}>
                  {isLoading ?
                    <Skeleton >
                      <CardActionArea >
                        <CardMedia
                          component="img"
                          image={item.img}
                          title="Contemplative Reptile"
                        />
                      </CardActionArea>
                    </Skeleton>
                    :
                    <CardActionArea >
                      <CardMedia
                        component="img"
                        image={item.img}
                        title="Contemplative Reptile"
                      />
                    </CardActionArea>
                  }
                </Card>
              )
            })}
          </Slider>
        </Container>
      </Hidden>
    </div>
  )
}

export default ProductImage