import React from 'react';
import { Query } from 'react-apollo';
import {getAllArticles} from './Query'


const App = () => {
  return (
    <Query query={getAllArticles}>
      {({ loading, error, data }) => {
        if (loading) return <p>Relax, it's worth the wait...</p>
        if (error) return <p>Looks like we've got a problem...</p>
        return (
          <div className="container">
            <h1>Articles</h1>
            <div className="row">
              {data.products.edges.map(article => (
                <div className="col-sm">
                  <div className="card" style={{width: "18rem"}}>
                      {article.node.images.edges.map(image => (
                          <div>

                           <img
                           key={image.node.id}
                           src={image.node.originalSrc}
                           className="card-img-top"
                           style={{height: "10em"}}
                           alt="cover"
                         /> 
                        
                         </div>
                      ) )

                      }
                   {/*  <img
                      src={article.coverImageUrl}
                      className="card-img-top"
                      style={{height: "10em"}}
                      alt="cover"
                    /> */}
                    <div className="card-body">
                      <h5 className="card-title">{article.node.title}</h5>
                      <p className="card-text">{article.node.description}</p>
                      <button className="btn btn-primary">Read</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }}
    </Query>
  );
}

export default App;
