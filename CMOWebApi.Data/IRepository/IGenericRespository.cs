
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CMOWebApi.Data.IRepository
{
    public interface IGenericRespository<T> : IDisposable
    {
         IEnumerable<T> GetAll(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "");

        T GetByID(object id);

        Task<T> GetByIdAsync(object id);
        void Add(T entity);
        Task<T> AddAsync(T entity);
        void DeleteByID(object id);

        void Delete(T entityToDelete);

        void Update(T entityToUpdate);

        Task<T> UpdateAsync(T entityToUpdate);

        Task<T> DeleteAsync(T entityToDelete);

          IQueryable<T> Table { get; }

        void DeleteAllById(IEnumerable<T> entityToDelete);

        T Create(T entity);


    }
}
