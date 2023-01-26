import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import SwordsTest from "./SwordsTest.json";

const SwordsTestAddress = "0x5B0c5990dD92AfE497119F83AF4C19986C92dE0b";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [minted, setMinted] = useState("");
  const isConnected = Boolean(accounts[0]);

  useEffect(() => {
    showMinted();
  });

  async function handleFreeMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        SwordsTestAddress,
        SwordsTest.abi,
        signer
      );
      try {
        const response = await contract.mintFree(BigNumber.from(2), {
          value: ethers.utils.parseEther((0.00 * 2).toString()),
        });
        console.log("response: ", response);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }

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
        const response = await contract.mint(BigNumber.from(10), {
          value: ethers.utils.parseEther((0.00099 * 10).toString()),
        });
        console.log("response: ", response);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }

  const showMinted = async () => {
    if (window.ethereum) {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = await new ethers.Contract(
        SwordsTestAddress,
        SwordsTest.abi,
        provider
      );
      try {
        const minted1 = await contract.totalSupply();
        const minted = parseInt(minted1._hex, 16);

        setMinted(minted);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  };



  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text color="white" fontSize="48px" textShadow="0 5px #000000">
            Cat's Swords
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            textShadow="0 2px 2px #000000"
            color="white"
          >
            Cat's Swords is a collection of 777 NFT weapons, which will accompany mighty heroes on their quests!
          </Text>
          <Text fontSize="23px" color="white">
            {" "}
            {{ minted } == 777
              ? "Mint is over!"
              : `Swords minted ${minted} /777`}{" "}
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            textShadow="0 2px 2px #000000"
            color="white"
          ></Text>
        </div>
        {isConnected ? (
          //Free mint
          <div>
            
            <Button
              backgroundColor="#6517D"
              fontSize="20px"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="purple"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              margin="10px"
              onClick={handleFreeMint}
            >
              Mint 2 for free!
            </Button>

            <Button
              backgroundColor="#6517D"
              fontSize="20px"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="purple"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              margin="10px"
              onClick={handleMint}
            >
              Mint 10 for .0099!
            </Button>

            <Flex align="center" justify="center"></Flex>
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
