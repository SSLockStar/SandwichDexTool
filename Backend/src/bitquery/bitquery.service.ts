import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { request, gql, GraphQLClient } from 'graphql-request';

@Injectable()
export class BitqueryService {

    private GRAPH_API_BITQUERY = "https://graphql.bitquery.io";
    private client = new GraphQLClient(this.GRAPH_API_BITQUERY,{headers:{"X-API-KEY":"BQY5KsbTpW4whBdE1dO5F3T57lFtZkbK"}});

    constructor(
    
    ){}


    /**
     * Get Bitquery Ethereum Network Name For Human Network
     * @param chain 
     * @returns 
     */
    convertToBitqueryChain(chain: String){
        if(chain == "Ethereum")
         return "ethereum";
        if(chain == "BSC")
         return "bsc";
        if(chain == "Polygon")
         return "matic";
        return "";
    }


    /**
     * Get Stable Coin Address For Network
     * @param chain 
     * @returns 
     */
    getStableCoinAddressForChain(chain: String){
        if(chain == "Ethereum")//Ethereum Tether USDT Address
           return "0xdac17f958d2ee523a2206206994597c13d831ec7";
        if(chain == "BSC")//Binance USDC Address
            return "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
        if(chain == "Polygon")// POS Tether USDT Address
            return "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";

        return "";
    }

    async getTokenPrice(chain:String, address:String){
        return;
    }

    /**
     * Get Trade Data of Specific Token
     * @param chain 
     * @param address 
     * @returns 
     */
    async getTradeBook(chain:String, address:String){
        const tradeQuery =gql`query ($network:EthereumNetwork!, $baseAddress:String!, $quoteAddress:String!){
            ethereum(network: $network) {
              dexTrades(
                options: {limit: 10, desc: "timeInterval.second"}
                date: {since: "2022-01-13"}
                baseCurrency: {is: $baseAddress}
                quoteCurrency: {is: $quoteAddress}
              ) {            
                protocol
                baseCurrency{
                  decimals
                  symbol
                  name
                }
                volume: baseAmount
                trades: count
                tradeAmount(in: USD)
                timeInterval {
                    second
                }
                quotePrice
                high: quotePrice(calculate: maximum)
                      low: quotePrice(calculate: minimum)
              }
            }
          }`;

        const variables={
            "network":this.convertToBitqueryChain(chain),
            baseAddress:address,
            quoteAddress:this.getStableCoinAddressForChain(chain)
        }
        const data = await this.client.request(tradeQuery, variables);
        return data;
    }

    getTradeByAddress(){

    }

    getHolders(){

    }

    getLiquidity(){

    }
}
