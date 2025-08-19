using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CMOWebApi.Data.IRepository;


namespace CMOWebApi.Data.Repository
{
    public class GenericRepository<T> : IDisposable, IGenericRespository<T> where T :class
    {
        internal DbSet<T> dbSet;
        private readonly Jankalyan_DBEntities _context = null;
        public GenericRepository(Jankalyan_DBEntities context)
        {
            this._context = context;
            this.dbSet = _context.Set<T>();
        }
        public virtual IEnumerable<T> GetAll(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<T> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public virtual T GetByID(object id)
        {
            return dbSet.Find(id);
        }

        public async Task<T> GetByIdAsync(object id)
        {
            return await dbSet.FindAsync(id);
        }

        public virtual void Add(T entity)
        {
            dbSet.Add(entity);
        }

        public async Task<T> AddAsync(T entity)
        {
            dbSet.Add(entity);
            return entity;
        }

        public  T Create(T entity)
        {
            dbSet.Add(entity);
            return entity;
        }

     
        public virtual void DeleteByID(object id)
        {
            T entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(T entityToDelete)
        {
            if (_context.Entry(entityToDelete).State == System.Data.Entity.EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
        }

        public virtual void DeleteAllById(IEnumerable<T> entityToDelete)
        {
            
            dbSet.RemoveRange(entityToDelete);
        }

        public virtual void Update(T entityToUpdate)
        {
            dbSet.Attach(entityToUpdate);
            _context.Entry(entityToUpdate).State = System.Data.Entity.EntityState.Modified;
        }

        public async Task<T> UpdateAsync(T entityToUpdate)
        {
            dbSet.Attach(entityToUpdate);
            _context.Entry(entityToUpdate).State = System.Data.Entity.EntityState.Modified;
            return entityToUpdate;
        }

        public async Task<T> DeleteAsync(T entityToDelete)
        {
            if (_context.Entry(entityToDelete).State == System.Data.Entity.EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
            return entityToDelete;
        }

        public virtual IQueryable<T> Table
        {
            get
            {
                return this.Entities;
            }
        }
        protected virtual IDbSet<T> Entities
        {
            get
            {
                if (dbSet == null)
                    dbSet = _context.Set<T>();
                return dbSet;
            }
        }

        #region IDisposable Members

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
