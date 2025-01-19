import React from "react";
import "../../Styles/List.css"

const ItemList = () => {
    return (
        <>
            <div className="main-container">
            <h1>Item list</h1>

                <ul>
                <div className="list-container">
                    <li className="list-item-container">
                        <p className="name"></p>
                        <p className="description"></p>
                        {/* <button className="btn-view" (click)="showDetails(item.id)"> View </button>
                       
                        // <button className="btn-view" (click)="update(item.id)"> Edit </button>
                        
                        // <button className="btn-view2" (click)="showConfirmation(item.id)"> Delete </button>
                        
                        // <div className="form-container">
                        //     <div className="form-thing">
                        //     <h3>Are you sure you want to delete ?</h3>
                        //     </div>
                        //     <div className="form-buttons">
                        //     <button className="btn-view2" (click)="deleteThing(item.id)">Yes</button>
                        //     <button className="btn-view" (click)="undo()">No</button>
                        //     </div>
                        // </div>
                        
                    
                    
                     */}
                    </li>
                </div>
                </ul>
            </div>
        </>
    );

}

export default ItemList;