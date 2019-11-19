const Helpers = use("Helpers");
const exists = Helpers.promisify(require("fs").exists);
const path = use("path");
class ScaffoldController {
  constructor() {
    this.resource = {
      type: "view"
    };
  }

  async index({ view, response }) {
    this.getViews(view);
    const data = this.data || (await this.resource.model.all());
    if (this.resource.type === "api")
      return response.send({ success: true, data });

    return view.render("resource.index", {
      ...(await this.getCommonProps()),
      data
    });
  }

  async show({ params: { id }, response }) {
    const data = this.data || (await this.resource.model.findOrFail(id));
    this.resource.model.with && (await data.load(this.resource.model.with));
    if (this.resource.type === "api")
      return response.send({ success: true, data });
  }

  async create({ view }) {
    this.getViews(view);
    return view.render("resource.create", {
      ...(await this.getCommonProps())
    });
  }

  async store({ request, response }) {
    const resourceParam = request.only(this.resource.model.visible);
    try {
      const data =
        this.data || (await this.resource.model.create(resourceParam));
      await data.reload();
      if (this.resource.type === "api")
        return response.send({ success: true, data });
      response.route(`${this.constructor.name}.index`);
    } catch (error) {
      console.log(error);
    }
  }

  async edit({ params: { id }, view }) {
    this.getViews(view);
    this.data = this.data || (await this.resource.model.findOrFail(id));
    this.resource.model.with && (await data.load(this.resource.model.with));
    return view.render("resource.create", {
      ...(await this.getCommonProps()),
      data
    });
  }

  async update({ params: { id }, request, response }) {
    try {
      const resourceParams = request.only(this.resource.model.visible);
      const current = await this.resource.model.findOrFail(id);
      current.merge(resourceParams);
      await current.save();
      await current.reload();
      if (this.resource.type === "api")
        return response.send({ success: true, current });
      response.route(`${this.constructor.name}.index`);
    } catch (error) {
      console.log(error);
    }
  }

  async destroy({ params: { id }, response }) {
    try {
      const current = await this.resource.model.findOrFail(id);
      await current.delete();
      response.route(`${this.constructor.name}.index`);
    } catch (error) {
      console.log(error);
    }
  }

  async getViews(view) {
    const isExist = await exists(Helpers.viewsPath("resource"));
    if (isExist) return;
    return (view._loader._viewsPath = Helpers.viewsPath(
      path.join(__dirname, "../src/resources/views")
    ));
  }

  getCommonProps = async () => {
    const { resource, constructor } = this;
    const { accessible_attributes } = await resource.model.getDataTypes();
    const { tables } = await resource.model.getTables();
    const nameController = constructor.name;
    return { resource, nameController, tables, accessible_attributes };
  };
}

module.exports = ScaffoldController;
