import { Box, Typography } from "@material-ui/core";

const ChapterFour = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "80%", margin: "auto" }}>
      <Typography variant="h5" style={{marginBottom: "25px"}}>5: Conclusion</Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{
            marginBottom: "15px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          In this module we have dealt with a simple banking system. However
          there is a lot more to it than we have seen! First of all we have
          dealt with only one type of money, called M1. M1 money includes cash
          and deposits, but there are other types of money with different
          characteristics which we will soon learn about. Secondly we haven't
          dealt with such issues as customer accounts going into negative
          figures or banks ending up with not enough assets to pay their
          liabilities. For now we can familiarise ourselves with the incomings
          and outgoings represented on bank balance sheets and customer
          accounts. Here we have a banking system with customers and two banks.
          Try depositing and withdrawing cash, making transfers and taking it
          loans. You may end up with extremely unequal balance sheets, and banks
          that can't meet their customer's demands. In the next module we will
          see what happens when customer accounts go into negative figures and
          how banks deal with being able to meet their customer's demands
        </Typography>
      </Box>
    </>
  );
};

export default ChapterFour;
