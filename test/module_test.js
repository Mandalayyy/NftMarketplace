const assert = require('assert');

const registrationModule = require('./registrationModule');
const emailConfirmationModule = require('./emailConfirmationModule');
const collectionManagementModule = require('./collectionManagementModule');
const nftManagementModule = require('./nftManagementModule');
const searchModule = require('./searchModule');

describe('Реєстрація користувачів', () => {
  it('Успішна реєстрація користувача з валідними даними', () => {
    const userData = [
      { email: 'example@mail.com', password: 'password123' },
      { email: 'test@example.com', password: '123456789' },
      { email: 'user@example.com', password: 'strongPassword' },
      { email: 'newuser@example.com', password: 'SecurePassword123' }
    ];

    userData.forEach(data => {
      const result = registrationModule.registerUser(data.email, data.password);
      assert.strictEqual(result.success, true);
    });
  });
});

describe('Реєстрація користувачів', () => {
    it('Обробка помилок при введенні невірних даних', () => {
      const invalidData = [
        { email: 'invalidemail', password: 'password' },
        { email: 'test@example.com', password: 'short' },
        { email: 'user@example.com', password: '123456' },
        { email: 'newuser@example.com', password: 'password' }
      ];
  
      invalidData.forEach(data => {
        const result = registrationModule.registerUser(data.email, data.password);
        assert.strictEqual(result.success, false);
      });
    });
  });

  describe('Реєстрація користувачів', () => {
    it('Перевірка унікальності електронної пошти під час реєстрації', () => {
      const duplicateEmailData = [
        { email: 'example@mail.com', password: 'password' },
        { email: 'example@mail.com', password: 'SecurePassword' }
      ];
  
      const firstRegistration = registrationModule.registerUser(duplicateEmailData[0].email, duplicateEmailData[0].password);
      assert.strictEqual(firstRegistration.success, true);
  
      const secondRegistration = registrationModule.registerUser(duplicateEmailData[1].email, duplicateEmailData[1].password);
      assert.strictEqual(secondRegistration.success, false);
  
  
    });
  });

  describe('Реєстрація користувачів', () => {
    it('Перевірка правильності валідації пароля', () => {
      const invalidPasswordData = [
        { email: 'example@mail.com', password: 'short' },
        { email: 'example@mail.com', password: 'onlyletters' },
        { email: 'example@mail.com', password: 'onlynumbers' }
      ];
  
      invalidPasswordData.forEach(data => {
        const result = registrationModule.registerUser(data.email, data.password);
        assert.strictEqual(result.success, false);
      });
    });
  });

  describe('Реєстрація користувачів', () => {
    it('Обробка помилок при спробі реєстрації з вже існуючою електронною поштою', () => {
      const existingEmailData = [
        { email: 'example@mail.com', password: 'password' },
        { email: 'test@example.com', password: 'password' },
        { email: 'user@example.com', password: 'password' }
      ];
  
      existingEmailData.forEach(data => {
        const firstRegistration = registrationModule.registerUser(data.email, data.password);
        assert.strictEqual(firstRegistration.success, true);
  
        const secondRegistration = registrationModule.registerUser(data.email, data.password);
        assert.strictEqual(secondRegistration.success, false);
      });
    });
  });

  describe('Підтвердження електронної пошти', () => {
    it('Відправка листа підтвердження після реєстрації', () => {
      const userEmail = 'testuser@example.com';
      const result = emailConfirmationModule.sendConfirmationEmail(userEmail);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Підтвердження електронної пошти', () => {
    it('Підтвердження електронної пошти за допомогою посилання з листа', () => {
      const confirmationLink = 'example.com/confirmation?token=abcd1234';
      const result = emailConfirmationModule.confirmEmail(confirmationLink);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Підтвердження електронної пошти', () => {
    it('Перевірка терміну дії посилання для підтвердження електронної пошти', () => {
      const expiredLink = 'example.com/confirmation?token=expired1234';
      const result = emailConfirmationModule.confirmEmail(expiredLink);
      assert.strictEqual(result.success, false);
    });
  });

  describe('Підтвердження електронної пошти', () => {
    it('Відновлення паролю через електронну пошту', () => {
      const userEmail = 'testuser@example.com';
      const result = emailConfirmationModule.resetPassword(userEmail);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Управління колекціями', () => {
    it('Створення нової колекції', () => {
      const collectionData = { name: 'TestCollection', description: 'TestDescription' };
      const result = collectionManagementModule.createCollection(collectionData);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Управління колекціями', () => {
    it('Редагування існуючої колекції', () => {
      const collectionId = '12345';
      const newData = { name: 'EditedName', description: 'EditedDescription' };
      const result = collectionManagementModule.editCollection(collectionId, newData);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Управління колекціями', () => {
    it('Видалення колекції', () => {
      const collectionId = '12345';
      const result = collectionManagementModule.deleteCollection(collectionId);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Управління колекціями', () => {
    it('Перегляд деталей колекції', () => {
      const collectionId = '12345';
      const result = collectionManagementModule.viewCollectionDetails(collectionId);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Управління NFT', () => {
    it('Створення нового NFT', () => {
      const nftData = { name: 'TestNFT', description: 'TestDescription', metadata: { key: 'value' } };
      const result = nftManagementModule.createNFT(nftData);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Управління NFT', () => {
    it('Редагування існуючого NFT', () => {
      const nftId = '12345';
      const newData = { name: 'EditedName', description: 'EditedDescription', metadata: { newKey: 'newValue' } };
      const result = nftManagementModule.editNFT(nftId, newData);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Управління NFT', () => {
    it('Видалення NFT', () => {
      const nftId = '12345';
      const result = nftManagementModule.deleteNFT(nftId);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Управління NFT', () => {
    it('Перегляд деталей NFT', () => {
      const nftId = '12345';
      const result = nftManagementModule.viewNFTDetails(nftId);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Пошук та фільтрація', () => {
    it('Пошук за ключовим словом', () => {
      const keyword = 'example';
      const result = searchModule.searchByKeyword(keyword);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Пошук та фільтрація', () => {
    it('Фільтрація результатів за категорією', () => {
      const category = 'exampleCategory';
      const result = searchModule.filterByCategory(category);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Пошук та фільтрація', () => {
    it('Комбінований пошук та фільтрація', () => {
      const keywords = ['example1', 'example2'];
      const categories = ['category1', 'category2'];
      const result = searchModule.combinedSearchAndFilter(keywords, categories);
      assert.strictEqual(result.success, true);
    });
  });

  describe('Пошук та фільтрація', () => {
    it('Сортування результатів', () => {
      const sortingCriteria = 'exampleSorting';
      const result = searchModule.sortResults(sortingCriteria);
      assert.strictEqual(result.success, true);
    });
  });

