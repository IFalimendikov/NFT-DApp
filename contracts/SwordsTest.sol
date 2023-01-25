// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SwordsTest is ERC721A, Ownable, ReentrancyGuard {
    using Strings for uint256;

    string private baseURI;
    string public baseExtension = ".json";
    string public hiddenURI;
    bool public mintActive = false;
    bool public revealLive = false;
    uint256 public supply = 777;
    uint256 public cost = 990000000000000;
    uint256 public freeMints = 2;
    uint256 private reserve = 30;
    
    mapping(address => uint256) mintedFreeNFTs;

    constructor() ERC721A("SwordsTest", "SWTT") {}

    modifier mintActiveCompliance(uint256 _count) {
        require(mintActive, "Mint is not active");
        _;
    }

    modifier supplyCompliance(uint256 _count) {
        require(
            totalSupply() + _count <= supply - reserve,
            "Requested mint count exceeds the supply"
        );
        _;
    }

    modifier mintPriceCompliance(uint256 _count) {
        require(msg.value >= cost * _count, "Not enough ETH for mint count");
        _;
    }

    function mintFree(uint256 _count)
        external
        nonReentrant
        mintActiveCompliance(_count)
        supplyCompliance(_count)
    {
        require(msg.sender == tx.origin, "Contracts can't mint");
        require(
            mintedFreeNFTs[msg.sender] + _count <= freeMints,
            "You already minted your free Swords!"
        );
        mintedFreeNFTs[msg.sender] += _count;
        _safeMint(msg.sender, _count);
    }

    function mint(uint256 _count)
        external
        payable
        nonReentrant
        mintActiveCompliance(_count)
        supplyCompliance(_count)
        mintPriceCompliance(_count)
    {
        require(msg.sender == tx.origin, "contracts can't mint");
        _safeMint(msg.sender, _count);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealLive == false) {
            return hiddenURI;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        _tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function reserveTokens(address owner, uint256 _count)
        external
        nonReentrant
        onlyOwner
    {
        require(
            _count <= reserve,
            "Requested mint count exceeds reserve limit"
        );
        _safeMint(owner, _count);
        reserve = reserve - _count;
    }

    function releaseReserve() external onlyOwner {
        reserve = 0;
    }

    function setMintActive(bool _mintActive) external onlyOwner {
        mintActive = _mintActive;
    }

    function setReveal() public onlyOwner {
        revealLive = true;
    }

    function setHiddenURI(string memory _hiddenURI) external onlyOwner {
        hiddenURI = _hiddenURI;
    }

    function setBaseURI(string memory uri) external onlyOwner {
        baseURI = uri;
    }

    function setCost(uint256 _cost) public onlyOwner {
        cost = _cost;
    }

    function withdraw() public payable onlyOwner nonReentrant {
        (bool success, ) = payable(owner()).call{value: address(this).balance}(
            ""
        );
        require(success);
    }
}
