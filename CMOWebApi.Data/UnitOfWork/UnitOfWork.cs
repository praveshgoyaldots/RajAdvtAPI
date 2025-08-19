using CMOWebApi.Data.IRepository;
using CMOWebApi.Data.Repository;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Reflection;
using System.Threading.Tasks;

namespace CMOWebApi.Data.UnitOfWork
{
    public class UnitOfWork : IUnitofWork, IDisposable
    {

        private readonly Jankalyan_DBEntities _context = null;
        public UnitOfWork(Jankalyan_DBEntities context)
        {
            this._context = context;
        }

        public IGenericRespository<T> GenericRepository<T>() where T : class
        {
            IGenericRespository<T> repo = new GenericRepository<T>(_context);
            return repo;
        }


        public Database GetDatabase()
        {
            return _context.Database;
        }
        private System.Data.ConnectionState _State;
        public System.Data.ConnectionState State { get { return _State; } set { _State = _context.Database.Connection.State; } }

        public void close()
        {
            _context.Database.Connection.Close();
        }
        public IEnumerable<T> ExeccuteStoreProcedure<T>(string query, params object[] parameters) where T : class
        {
            return _context.Database.SqlQuery<T>(query, parameters);

        }
        //public async Task<IEnumerable<T>> ExeccuteStoreProcedureasync<T>(string query, params object[] parameters) where T : class
        //{
        //    return await _context.Database.SqlQuery<T>(query, parameters).ToListAsync();
        //}

        public int ExeccuteStoreProcedure(string sqlQuery, params object[] parameters)
        {
            return _context.Database.ExecuteSqlCommand(sqlQuery, parameters);

        }

        public ObjectResult<T> ExeccuteStoreProcedureMultiResult<T>(string strquery, params ObjectParameter[] parameters) where T : class
        {
            return ((IObjectContextAdapter)_context).ObjectContext.ExecuteFunction<T>(strquery, parameters);
        }

        //Save function with Unit of work connection
        public void save()
        {
            _context.SaveChanges();
        }
        // Dispose the object
        # region Dispose
        private bool _disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this._disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }



        #endregion
    }
}
