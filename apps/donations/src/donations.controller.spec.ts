import { Test, TestingModule } from '@nestjs/testing';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';

describe('DonationsController', () => {
  let donationsController: DonationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DonationsController],
      providers: [DonationsService],
    }).compile();

    donationsController = app.get<DonationsController>(DonationsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(donationsController.getHello()).toBe('Hello World!');
    });
  });
});
