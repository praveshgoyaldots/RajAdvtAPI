
using CMOWebApi.Data.IRepository;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace CMOWebApi.Data.UnitOfWork
{
    public interface IUnitofWork
    {
        Database GetDatabase();
        IGenericRespository<T> GenericRepository<T>() where T : class;
        void save();
        IEnumerable<T> ExeccuteStoreProcedure<T>(string query, params object[] parameters) where T : class;
        //Task<IEnumerable<T>> ExeccuteStoreProcedureasync<T>(string query, params object[] parameters) where T : class;

        System.Data.ConnectionState State { get; set; }

        void close();
        int ExeccuteStoreProcedure(string query, params object[] parameters);
        ObjectResult<T> ExeccuteStoreProcedureMultiResult<T>(string strquery, params ObjectParameter[] parameters) where T : class;
      
    }
}
