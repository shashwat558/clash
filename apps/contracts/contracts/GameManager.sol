// SPDX-LICENSE-IDENTIFIER: UNLICENSED
pragma solidity ^0.8.20;

import "./MonarcToken.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";


contract GameManager is Ownable {
    MonarcToken public immutable mnc;

    uint256 public constant WIN_REWARD = 25 ether;
    uint256 public constant PARTIAL_REWARD = 10 ether;

    enum GAME_RESULT {
        LOSS,
        PARTIAL,
        WIN
    };

    event GameResultProcessed(
        address indexed player,
        GAME_RESULT,
        uint256 reward
    );

    constructor(address _mnc) {
        mnc = MonarcToken(_mnc);
    }
    
    function processGameResult(
        address player,
        GAME_RESULT result
    ) external onlyOwner {
        uint256 reward = 0;

        if(result == GAME_RESULT.WIN){
            reward = WIN_REWARD;
        } else if(result == GAME_RESULT.PARTIAL) {
            reward = PARTIAL_REWARD;
        }

        if (reward > 0) {
            mnc.mint(player, reward);
        }

        emit GameResultProcessed(
          player,
          result,
          reward
        );

        // Optional sink
        function burnFrom(address player, uint256 amount) external onlyOwner {
            _burn(player, amount);

        }

    }
}