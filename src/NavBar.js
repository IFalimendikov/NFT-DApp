import React, { useEffect } from "react";
import { Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import Etherscan from "./assets/assets/social-media-icons/etherscan.png";
import OpenSea from "./assets/assets/social-media-icons/opensea.png";
import Twitter from "./assets/assets/social-media-icons/twitter.png";

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  useEffect(() => {
    connectAccount();
  });

  return (
    <Flex align="center" justify="right" padding="30px">
      <Flex
        justify="space-around"
        align="center"
        width="30%"
        padding="30px 30px 30px 30px"
      >
        <Link href="https://twitter.com/SwordsNFT">
          <Image src={OpenSea} boxSize="42px" margin="0 15px" />
        </Link>

        <Link href="https://twitter.com/SwordsNFT">
          <Image src={Twitter} boxSize="42px" margin="0 15px" />
        </Link>

        <Link href="https://twitter.com/SwordsNFT">
          <Image src={Etherscan} boxSize="42px" margin="0 15px" />
        </Link>

        {isConnected ? (
          <Box fontSize="25px" color="white" margin="0 15px">
            Connected
          </Box>
        ) : (
          <Button
            backgroundColor="transparent"
            borderRadius="5px"
            boxShadow="0px 1px 1px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            fontSize="20px"
            onClick={connectAccount}
          >
            {" "}
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
