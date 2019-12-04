package app.udemy.hibernate.dao;

import lombok.Setter;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;

@Setter
public abstract class CommonDaoImpl<T> {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
       /**
     * with @PersistenceContext Enetity manager is managed by context. I dont have to create this object by my self form EntityManagerFactory
     */
    @PersistenceContext
    private EntityManager entityManager;//belongs to JPA

    @Autowired
    private EntityManagerFactory entityManagerFactory;//only to create new EntityManager

    void persistTransactional(T object) {
        entityManager.persist(object);
    }

    /**
     * creating new EntityManager used only once for test!! from now only @Transactional
     *
     * @param object object
     */
    void persistWithoutTransactional(T object) {
        EntityManager em = entityManagerFactory.createEntityManager();//cant use shared entity manager from PersistanceContext!!
        logger.debug("Transaction1: " + em.getTransaction().isActive());
        em.getTransaction().begin();
        logger.debug("Transaction2: " + em.getTransaction().isActive());
        em.persist(object);//set object to persist state
        em.getTransaction().commit();
        logger.debug("Transaction3: " + em.getTransaction().isActive());
        logger.debug("Entity manager: " + em.isOpen());
    }

    /**
     * persist vs save - persist returns void (nothing), save returns ID of new object
     * both save new entity to DB
     */
    Long save(T object) {
        return (Long) getHibernateSession().save(object);
    }

    void persist(T object) {
        getHibernateSession().persist(object);
    }

    T getById(Long id, final Class<T> clazz){
        return getHibernateSession().find(clazz, id);
    }

    private Session getHibernateSession() {
        return entityManager.unwrap(Session.class);
    }
}
