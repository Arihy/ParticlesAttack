Rectangle = function(_x, _y, _w, _h)
{
	this.x = (_x || 0);
	this.y = (_y || 0);
	this.w = (_w || 0);
	this.h = (_h || 0);

	this.Contains = function(_x, _y)
	{
		if(_x >= this.x && _x <= this.x + this.w && _y >= this.y && _y <= this.y + this.h)
			return true;
		else
			return false;
	}

	//test if there are a collision entre rectangle and _shape
	this.Intersects = function(_shape)
	{
		//if _shape is a circle
		var offset = 0;
		if(_shape.radius != null)
			offset = _shape.radius;

		if(this.Contains(_shape.x - offset, _shape.y - offset) || this.Contains(_shape.x + _shape.w - offset, _shape.y - offset) ||
			this.Contains(_shape.x - offset, _shape.y + _shape.h - offset) || this.Contains(_shape.x + _shape.w - offset, _shape.y + _shape.h - offset))
		{
			return true;
		}
		/*
		else if(_shape.Contains(this.x - offset, this.y - offset) || _shape.Contains(this.x + this.w - offset, this.y - offset) ||
			_shape.Contains(this.x - offset, this.y + this.h - offset) || _shape.Contains(this.x + this.w - offset, this.y + this.h - offset))
		{
			return true;
		}*/

		return false;
	}

	//draw the rectangle
	this.Draw = function(_ctx, _color)
	{
		_ctx.fillStyle = _color;
		_ctx.fillRect(this.x, this.y, this.w, this.h);
	}

	return this;
};