import { ethers } from 'ethers'
import React, { useEffect } from 'react'
import { useAccount, useContractRead, useContractReads, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'
import {abi, contractAddresses} from '../constants'

const raffleContract = {
  addressOrName: '0xe15c740c08dbd43f93fc95026a80feff9de98def',
  contractInterface:abi
}

export default function LotteryEntrance() {

    const {address} = useAccount()
    const { chains, chain} = useNetwork()

    const {data, status:readStatus} = useContractReads({
      contracts:[
        {
          ...raffleContract,
          functionName:'getEntranceFee'
        },
        {
          ...raffleContract,
          functionName:'getNumberOfPlayers'
        },
        {
          ...raffleContract,
          functionName:'getRecentWinner'
        }
      ]
    })

    // const {data: entranceFee, status:readStatus} = useContractRead({
    //   addressOrName:'0xe15c740c08dbd43f93fc95026a80feff9de98def',
    //   contractInterface:abi,
    //   functionName:'getEntranceFee'
    // })

    if(readStatus==='success')
      console.log('entrance fee: ', ethers.utils.formatUnits(data[0].toString(),'ether'));


    // useEffect(()=>{
    //   if(readStatus==='success'){
    //     console.log('entrance fee: ',entranceFee);
    //   }
    // },[readStatus])

    const {config } = usePrepareContractWrite({
      addressOrName: '0xe15c740c08dbd43f93fc95026a80feff9de98def',
      contractInterface:abi,
      args:[],
      functionName:'enterRaffle',
      overrides:{
        value: ethers.utils.parseEther('0.01')
      },
      onError(err){
        console.log('error: ' + err);
      }
    })
    const {writeAsync:enterRaffleFunc, status:enterRaffleStatus ,error:enterRaffleError, isLoading:enterRaffleLoading,isSuccess:enterRaffleSuccess} = useContractWrite(config)

    const handleEnterRaffle = async ()=>{
      try {
          const txResponse = await enterRaffleFunc()  
          await txResponse.wait(5)
          // await raffleContract.getNumberOfPlayers()
          // await raffleContract.getRecentWinner()
      } catch (error) {
        console.log('error: ', error)
      }
    }

    console.log('address: ', address);
    // console.log('chains: ', chains);
    console.log('chain: ', chain);

    useEffect(()=>{
      if(enterRaffleStatus ==='success'){
        console.log('raffle entered successfully');
      }
      if(enterRaffleStatus ==='error'){
        console.log('error: ',enterRaffleError.message);
      }
    },[enterRaffleStatus])

  if(readStatus==='success'){
    return (
      <div>LotteryEntrance: 
        {chain.id !== 5 
        ? <div>no Raffle found on the current network</div>
        :<div>
          {/* <button onClick={enterRaffleFunc}>enter raffle</button> */}
          <button onClick={handleEnterRaffle}>enter raffle</button>
          <div>entrance fee: {ethers.utils.formatUnits(data[0].toString(),'ether')} eth</div>
          <div>number of players: {parseInt(data[1])}</div>
          <div>recent winner: {data[2]}</div>
        </div>
        }
      </div>
    )
  }
}
