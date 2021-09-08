import { useEffect, useState } from 'react';
import React  from 'react';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';

const Intro = () => {

      useEffect(function () {
        changeAccounts();
      },[]);

      async function addNetwork() {

        let networkData = [{
                chainId: "0x61",
                chainName: "BSCTESTNET",
                rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
                nativeCurrency: {
                  name: "BINANCE COIN",
                  symbol: "BNB",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://testnet.bscscan.com/"],
              },
            ];
    
          // agregar red o cambiar red
          return window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: networkData,
          });
      }

      async function init() {  

        if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                let accountConnection = accounts[0];
                let subint = accountConnection.substr(0,4);
                let subfinal = accountConnection.substr(-4,4);
                document.querySelector('#intro').innerHTML ='conectado con la cuenta: ' + subint + '...' + subfinal;
        } else {
          Swal.fire({
            title: "No tiene metamask instalado",
            text: "Cambie de navegador o puede instalárselo apretando al botón",
            showCancelButton: true,
            confirmButtonText: "Instalar",
            imageUrl: './img/metamask-transparent.png',
            imageAlt: "Instalar metamask",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank');  
            }});
        } 
      
      }

        // funcion que detecta los cambios de cuenta
        async function changeAccounts() {
              
          if (typeof window.ethereum !== 'undefined') {

            window.ethereum.on("accountsChanged", async function () {

              await init();
              
            });

          }
        }

        function faucet() {
          window.open('https://testnet.binance.org/faucet-smart', '_blank');  
        }
    
    return (
        <div className="App">       
        <div className="b-example-divider"></div>
          <div className="bg-dark container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="row align-items-center g-lg-5 py-5">
              <div className="col-lg-7 text-center text-lg-start">
                <h2  className="display-4 fw-bold lh-1 mb-3 text-white">Usaremos la red Binance Smart Chain</h2>
                <p  className="col-lg-10 fs-4 text-white">Lo primero, deme su permiso para conectarme a su Metamask. La conexión automática de su metamask por parte de una DAPP es una mala práctica. Téngalo en cuenta a la hora de crear la suya. </p>
                <p  className="col-lg-10 fs-4 text-white"> Si usted no dispone de la red de pruebas de BSC, se instalará apretando el botón naranja. Si ya la dispone, cambiará a esa red automáticamente.</p>
                <p  className="col-lg-10 fs-4 text-white">Si no tenía la Red, tampoco tendra BNBs de prueba para hacer el tutorial. Apretando al boton azul usted podrá reclamar un BNB para poder crear un cheque.</p>
              </div>
              <div className="col-md-10 mx-auto col-lg-5">

              <button id="btn-firma"  onClick={() => init()} className="w-100 btn btn-lg btn-danger mb-4" type="button">Conectar Metamask</button>

                    <button id="bnbNetwork"  onClick={() => addNetwork()} className="w-100 btn btn-lg btn-warning mb-4" type="button">Añadir Red Binance Smart Chain de pruebas</button>

                    <button id="faucet"  onClick={() => faucet()} className="w-100 btn btn-lg btn-primary" type="button">Faucet de Binance</button>
                    <hr className="my-4"/>
                    <form className="p-4 p-md-5 border rounded-3 bg-light">
                    <div className="form-floating mb-3">
                    </div>
                    <hr className="my-4"/>
                    <small id="intro" className="text-muted">No conectado</small>
                </form>
              <div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Intro;