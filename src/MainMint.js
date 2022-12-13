import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import SwordsTest from "./SwordsTest.json";

const SwordsTestAddress = "******";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        SwordsTestAddress,
        SwordsTest.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString())
        });
        console.log("response: ", response);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 2) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text  color="white" fontSize="48px"  textShadow="0 5px #000000">
            Cat's Swords
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            textShadow="0 2px 2px #000000"
            color="white"
          >
            Cat's Swords is a collection of 3000 mighty NFT
            swords, which will accompany valiant heroes on their quests!
          </Text>
        </div>
        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#6517D"
                borderRadius="5px"
                boxShadow="0px 1px 1px 1px #0F0F0F"
                color="grey"
                cursor="pointer"
                fontFamily="inherit"
                padding="11px"

                fontSize='15px'
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                readOnly
                fontFamily="inherit"
                color="black"
                backgroundColor="#6517D"
                width="80px"
                height="40px"
                textAlign='center'
                fontSize='20px'
                
                margintop="10px"
                type="number"
                paddingLeft='17px'
                value={mintAmount}
              />
              <Button
                backgroundColor="#6517D"
                borderRadius="5px"
                boxShadow="0px 1px 1px 1px #0F0F0F"
                color="grey"
                cursor="pointer"
                fontFamily="inherit"
                padding="11px"
             
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor="#6517D"
              fontSize='20px'
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="purple"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={handleMint}
            >
              Mint!
            </Button>
          </div>
        ) : (
          <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="-5.5%"
            textShadow="0 3px #000000"
            color="#D6517D"
          >
            {" "}
            Connect wallet to mint.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
