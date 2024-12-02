import React from 'react';
import "../css/ecosmart.css"


const Ecosmart = () => {
    
    return(
        <div>
            <div className='maincontainer'>
                <div className='IconContainer'>
                    <img width={"350px"} src='logo.png'></img>
                    
                </div>
                <input type="text" className='search'></input>
                <img width={"20px"} src='search.png'></img>
            </div>
            <div className='cardscontainer'>
                <div className='card' style={{backgroundColor: "#FF5555"}}>
                    
                    <img  className='cover' width={"100%"} src='cover.png'></img>
                    <div className='contentbox'>
                        <img  style={{rotate: "-28deg", marginTop:"40px"}} width={"80px"} src='recycle-icon.png'></img>
                        <div className='content'>
                        <h1>Plástico</h1>
                            <div>
                                Garrafas pet (limpas)
                            </div>
                            <div>
                                Embalagens de alimentos (potes, bandejas)
                            </div>
                            <div>
                                Canudos e copos plásticos
                            </div>
                            <div>
                                Sacos plásticos
                            </div>
                            <img width={"100%"} src='plastic.png'></img>
                        </div>
                        
                    </div>
                    
                </div>
                <div className='card'style={{backgroundColor: "#BFBFBF"}}>
                    <img  className='cover' width={"100%"} src='cover.png'></img>
                    <div className='contentbox'>
                        <img style={{rotate: "-28deg", marginTop:"40px"}} width={"80px"} src='recycle-icon.png'></img>
                    </div>
                    
                </div>
                <div className='card'style={{backgroundColor: "#5B9BFC"}}>
                    <img className='cover'  width={"100%"} src='cover.png'></img>
                    <div className='contentbox'>
                        <img style={{rotate: "-28deg", marginTop:"40px"}} width={"80px"} src='recycle-icon.png'></img>
                        <div className='content'>
                            <h1>Papel e Papelão</h1>
                            <div>
                                Jornais e revistas
                            </div>
                            <div>
                                Caixas de papelão
                            </div>
                            <div>
                                Cartões de papelão (embalagens)
                            </div>
                            <div>
                                Cadernos e folhas usadas
                            </div>
                            <img width={"100%"} src='paper2.png'></img>
                        </div>
                    </div>
                    
                </div>
                <div className='card'style={{backgroundColor: "#FAEA43"}}>
                    <img   className='cover' width={"100%"} src='cover.png'></img>
                    <div className='contentbox'>
                        <img style={{rotate: "-28deg", marginTop:"40px"}} width={"80px"} src='recycle-icon.png'></img>
                        <div className='content'>
                            <h1>Metais</h1>
                            <div>
                                Latas de bebidas (alumínio, aço)
                            </div>
                            <div>
                                Tampas metálicas
                            </div>
                            <img width={"100%"} src='metal.png'></img>
                        </div>
                    </div>
                </div>
                <div className='card'style={{backgroundColor: "#A44343"}}>
                    <img  className='cover' width={"100%"} src='cover.png'></img>
                    <div className='contentbox'>
                        <img style={{rotate: "-28deg", marginTop:"40px"}} width={"80px"} src='recycle-icon.png'></img>
                        <div className='content'>
                        <h1>Lixo Orgânico</h1>
                                <div>
                                    Restos de alimentos (frutas, legumes, cascas)
                                </div>
                            
                            
                                <div>
                                    Papel toalha usado
                                </div>
                              
                            <img width={"100%"} src='waste.png'></img>
                        </div>
                    </div>
                </div>
                <div className='card'style={{backgroundColor: "#2CFF64"}}>
                    <img  className='cover' width={"100%"} src='cover.png'></img>
                    <div className='contentbox'>
                    <img style={{rotate: "-28deg", marginTop:"40px"}} width={"80px"} src='recycle-icon.png'></img>
                    </div>
                </div>
            </div>
            
        </div>
    );

}

export default Ecosmart;