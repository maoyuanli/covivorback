import {Router} from "express";
import {addSkill, findSkillByName, getAllSkills, updateSkill} from '../controllers/skill/skill.controller';

export const skillRouter = Router();

skillRouter.route('/add')
    .post(addSkill);

skillRouter.route('/find/:name')
    .get(findSkillByName);

skillRouter.route('/update')
    .patch(updateSkill);

skillRouter.route('/getall')
    .get(getAllSkills);

